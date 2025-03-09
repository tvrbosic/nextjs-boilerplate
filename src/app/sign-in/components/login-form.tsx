'use client';
// LIB
import { use, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

// APP
import { AuthApiClient } from '@/api-clients/auth/auth-client';
import { AuthContext } from '@/context/auth/auth-context';
import { ToastMessageContext } from '@/context/toast-message/toast-context';
import processAxiosError from '@/utility/process-axios-error/process-axios-error';

// TYPES
import { TSubmitLoginFormAction } from '@/app/sign-in/components/types';

// COMPONENTS
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import NavLink from '@/components/nav-link/nav-link';

const loginValidationSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email address'),
  password: z
    .string()
    .min(8, { message: 'Must be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Must contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Must contain at least one number.' }),
});

export default function LoginForm() {
  // ============================| UTILITY |============================ //
  const { user, setUser } = use(AuthContext);
  const { showToast } = use(ToastMessageContext);
  const router = useRouter();

  // ============================| FUNCTIONS |============================ //
  const submitLoginForm = async (
    previous: TSubmitLoginFormAction,
    formData: FormData
  ): Promise<TSubmitLoginFormAction> => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const validationResult = loginValidationSchema.safeParse({
      email,
      password,
    });

    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    try {
      const response = await AuthApiClient.instance.login({ email, password });

      // Set logged user to context and show toast message
      setUser(response.data?.user!);
      showToast('Sign in successful');

      // Redirect to home page
      router.push('/');

      // No error
      return { email, password };
    } catch (error) {
      const errorMessage = processAxiosError({ error });
      showToast(errorMessage, 'error');

      // Return error message
      return { errors: { api: [errorMessage] } };
    }
  };

  // ============================| ACTION |============================ //
  const [state, loginAction, isPending] = useActionState<
    TSubmitLoginFormAction,
    FormData
  >(submitLoginForm, {});

  // ============================| RENDER |============================ //
  return (
    <form
      action={loginAction}
      className="w-full flex flex-col space-y-4 justify-center"
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

      <div className="flex flex- space-x-2 justify-center items-center">
        <p className="text-purple-100">Don't have an account?</p>
        <NavLink href={'/register'} variant="light">
          Register
        </NavLink>
      </div>
    </form>
  );
}
