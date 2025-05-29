'use client';
// LIBRARY
import { use, useActionState } from 'react';
import { useRouter } from 'next/navigation';

// APP
import { AuthApiClient } from '@/api-clients/auth/auth-client';
import { AuthContext } from '@/context/auth/auth-context';
import { ToastMessageContext } from '@/context/toast-message/toast-context';
import { registerValidationSchema } from '@/app/(auth)/validations';
import processAxiosError from '@/utility/process-axios-error';
import { formDataToObject } from '@/utility/object';

// TYPES
import { IRegisterForm, TSubmitRegisterFormAction } from '@/app/(auth)/types';
import { IWithErrorBoundaryTriggerProps } from '@/hoc/types';

// COMPONENTS
import { withErrorBoundaryTrigger } from '@/hoc/error-boundary-trigger';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import NavLink from '@/components/nav-link/nav-link';

function RegisterForm({ triggerGlobalError }: IWithErrorBoundaryTriggerProps) {
  // ============================| UTILITY |============================ //
  const { showToast } = use(ToastMessageContext);
  const router = useRouter();

  // ============================| FUNCTIONS |============================ //
  const submitRegisterForm = async (
    previous: TSubmitRegisterFormAction,
    formData: FormData | null
  ): Promise<TSubmitRegisterFormAction> => {
    // Reset errors (by calling function with formData null and returning initial state / empty object)
    if (!formData) {
      return {};
    }

    const { email, password, passwordConfirm, firstName, lastName } = formDataToObject<IRegisterForm>(formData);

    // Validate form data
    const validationResult = registerValidationSchema.safeParse({
      email,
      password,
      passwordConfirm,
      firstName,
      lastName,
    });

    // Return validation errors if any
    if (!validationResult.success) {
      return {
        data: { email, password, passwordConfirm, firstName, lastName },
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    try {
      // Call API to register user
      const response = await AuthApiClient.instance.register({
        email,
        password,
        passwordConfirm,
        firstName,
        lastName,
      });

      // SUCCESS: Show toast message, redirect to sign in page and return form data
      const successMessage = response.message;
      showToast(successMessage);
      router.push('/sign-in');
      return {
        message: successMessage,
      };
    } catch (error) {
      // FAIL: Show toast message and return API error
      const errorMessage = processAxiosError({ error });
      errorMessage === '500' && triggerGlobalError();
      showToast(errorMessage, 'error');
      return { errors: { api: [errorMessage] } };
    }
  };

  // ============================| ACTION |============================ //
  const [state, registerAction, isPending] = useActionState<TSubmitRegisterFormAction, FormData | null>(
    submitRegisterForm,
    {}
  );

  // ============================| RENDER |============================ //
  return (
    <form action={registerAction} className="flex w-full flex-col justify-center space-y-4" noValidate>
      <Input
        inputType="text"
        inputLabel="First name"
        name="firstName"
        defaultValue={state.data?.firstName}
        error={state.errors?.firstName?.[0]}
      />

      <Input
        inputType="text"
        inputLabel="Last name"
        name="lastName"
        defaultValue={state.data?.lastName}
        error={state.errors?.lastName?.[0]}
      />

      <Input
        inputType="email"
        inputLabel="E-mail"
        name="email"
        defaultValue={state.data?.email}
        error={state.errors?.email?.[0]}
      />

      <Input
        inputType="password"
        inputLabel="Password"
        name="password"
        defaultValue={state.data?.password}
        error={state.errors?.password?.[0]}
      />

      <Input
        inputType="password"
        inputLabel="Confirm password"
        name="passwordConfirm"
        defaultValue={state.data?.passwordConfirm}
        error={state.errors?.passwordConfirm?.[0]}
      />

      <Button fullWidth size="lg" type="submit" isLoading={isPending}>
        Sign up
      </Button>

      <div className="flex items-center justify-center space-x-2">
        <p className="text-main">Already have an account?</p>
        <NavLink href={'/sign-in'} variant="secondary">
          Sign in here
        </NavLink>
      </div>

      <div className="flex items-center justify-center">
        <NavLink href={'/'}>Return to home page</NavLink>
      </div>
    </form>
  );
}

export default withErrorBoundaryTrigger(RegisterForm);
