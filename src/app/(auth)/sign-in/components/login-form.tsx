'use client';
// LIB
import { use, useActionState } from 'react';
import { useRouter } from 'next/navigation';

// APP
import { AuthApiClient } from '@/api-clients/auth/auth-client';
import { AuthContext } from '@/context/auth/auth-context';
import { ToastMessageContext } from '@/context/toast-message/toast-context';
import { loginValidationSchema } from '@/app/(auth)/validations';
import { verifyToken } from '@/utility/jwt/jwt';
import processAxiosError from '@/utility/process-axios-error/process-axios-error';

// TYPES
import { TSubmitLoginFormAction } from '@/app/(auth)/sign-in/components/types';
import { IWithErrorBoundaryTriggerProps } from '@/hoc/types';

// COMPONENTS
import { withErrorBoundaryTrigger } from '@/hoc/error-boundary-trigger';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import NavLink from '@/components/nav-link/nav-link';
import { IUserJwtClaims } from '@/utility/jwt/types';

function LoginForm({ triggerGlobalError }: IWithErrorBoundaryTriggerProps) {
  // ============================| UTILITY |============================ //
  const { user, setUser } = use(AuthContext);
  const { showToast } = use(ToastMessageContext);
  const router = useRouter();

  // ============================| FUNCTIONS |============================ //
  const submitLoginForm = async (
    previous: TSubmitLoginFormAction,
    formData: FormData | null
  ): Promise<TSubmitLoginFormAction> => {
    // Reset errors (by calling function with formData null and returning initial state / empty object)
    if (!formData) {
      return {};
    }

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate form data
    const validationResult = loginValidationSchema.safeParse({
      email,
      password,
    });

    // Return validation errors if any
    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    try {
      // Call API to login user
      const response = await AuthApiClient.instance.login({ email, password });

      // Verify response and token existance
      if (!response.data || !response.data.token) throw Error('Token missing!');
      const token = response.data?.token || undefined;

      // SUCCESS: Decode token, set user data to context, show toast message, redirect to home page and return form data
      const decoded = (await verifyToken(token)) as unknown as IUserJwtClaims;
      setUser({
        guid: decoded.guid,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        role: decoded.role,
        exp: decoded.exp,
      });
      showToast('Sign in successful');
      router.push('/');
      return { email, password };
    } catch (error) {
      // FAIL: Show toast message and return API error
      const errorMessage = processAxiosError({ error });
      errorMessage === '500' && triggerGlobalError();
      showToast(errorMessage, 'error');
      return { errors: { api: [errorMessage] } };
    }
  };

  // ============================| ACTION |============================ //
  const [state, loginAction, isPending] = useActionState<
    TSubmitLoginFormAction,
    FormData | null
  >(submitLoginForm, {});

  // ============================| RENDER |============================ //
  return (
    <form
      action={loginAction}
      className="flex w-full flex-col justify-center space-y-4"
      noValidate
    >
      <Input
        inputType="email"
        inputLabel="E-mail"
        name="email"
        error={state.errors?.email?.[0]}
      />

      <Input
        inputType="password"
        inputLabel="Password"
        name="password"
        error={state.errors?.password?.[0]}
      />

      <div className="text-end">
        <NavLink href={'/forgot-password'} size="sm">
          Forgot password?
        </NavLink>
      </div>

      <Button fullWidth size="lg" type="submit" isLoading={isPending}>
        Sign in
      </Button>

      <div className="flex items-center justify-center space-x-2">
        <p className="text-purple-100">Don't have an account?</p>
        <NavLink href={'/register'} variant="dark">
          Register
        </NavLink>
      </div>
    </form>
  );
}

export default withErrorBoundaryTrigger(LoginForm);
