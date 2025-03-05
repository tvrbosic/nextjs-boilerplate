'use client';
// LIB
import { use, useActionState } from 'react';
import { useRouter } from 'next/navigation';

// APP
import { AuthApiClient } from '@/api-clients/auth/auth-client';
import { AuthContext } from '@/context/auth/auth-context';
import { ToastMessageContext } from '@/context/toast-message/toast-context';
import processError from '@/utility/process-axios-error/process-axios-error';

// COMPONENTS
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import NavLink from '@/components/nav-link/nav-link';

export default function LoginForm() {
  // ============================| UTILITY |============================ //
  const { user, setUser } = use(AuthContext);
  const { showToast } = use(ToastMessageContext);
  const router = useRouter();

  // ============================| FUNCTIONS |============================ //
  const submitLoginForm = async (
    previous: string | undefined,
    formData: FormData
  ) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // TODO: Validate email and password

    try {
      const response = await AuthApiClient.instance.login({ email, password });

      // Set logged user to context
      setUser(response.data?.user!);
      showToast('Logged in successfully');

      // Redirect to home page
      router.push('/');
      return undefined;
    } catch (error) {
      const errorMessage = processError({
        error,
        onError: () => {
          console.log('Error');
          showToast('Error occurred - TODO message from BE', 'error');
        },
      });
      return errorMessage;
    }
  };

  // ============================| ACTION |============================ //
  const [error, loginAction, isPending] = useActionState(
    submitLoginForm,
    undefined
  );

  const test = () => {
    showToast('Test message', 'warning');
    showToast('Test message', 'error');
    showToast('Test message', 'info');
    showToast('Test message', 'success');
  };

  // ============================| RENDER |============================ //
  return (
    <form
      action={test}
      className="w-full flex flex-col space-y-4 justify-center"
    >
      <Input inputType="email" inputLabel="E-mail" name="email" />

      <Input inputType="password" inputLabel="Password" name="password" />

      <div className="text-end">
        <NavLink href={'/forgot-password'} size="sm">
          Forgot password?
        </NavLink>
      </div>

      <div className="mt-3">
        <Button fill size="lg" type="submit">
          Sign in
        </Button>
      </div>

      <div className="flex flex- space-x-2 justify-center items-center">
        <p className="text-purple-100">Don't have an account?</p>
        <NavLink href={'/register'} variant="light">
          Register
        </NavLink>
      </div>
    </form>
  );
}
