'use client';
// LIB
import { use, useActionState } from 'react';
import { useRouter } from 'next/navigation';

// APP
import { AuthApiClient } from '@/api-clients/auth/auth-client';
import { ToastMessageContext } from '@/context/toast-message/toast-context';
import { forgotPasswordValidationSchema } from '@/app/(auth)/validations';
import processAxiosError from '@/utility/process-axios-error/process-axios-error';

// TYPES
import { IWithErrorBoundaryTriggerProps } from '@/hoc/types';
import { TSubmitForgotPasswordFormAction } from '@/app/(auth)/forgot-password/components/types';

// COMPONENTS
import { withErrorBoundaryTrigger } from '@/hoc/error-boundary-trigger';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import NavLink from '@/components/nav-link/nav-link';

function ForgotPasswordForm({
  triggerGlobalError,
}: IWithErrorBoundaryTriggerProps) {
  // ============================| UTILITY |============================ //
  const { showToast } = use(ToastMessageContext);
  const router = useRouter();

  // ============================| FUNCTIONS |============================ //
  const submitLoginForm = async (
    previous: TSubmitForgotPasswordFormAction,
    formData: FormData | null
  ): Promise<TSubmitForgotPasswordFormAction> => {
    // Reset errors (by calling function with formData null and returning initial state / empty object)
    if (!formData) {
      return {};
    }

    const email = formData.get('email') as string;

    // Validate form data
    const validationResult = forgotPasswordValidationSchema.safeParse({
      email,
    });

    // Return validation errors if any
    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    try {
      // Call API to sent password reset link
      const response = await AuthApiClient.instance.forgotPassword({ email });

      // TODO: TEST !!!
      const successMessage = response.message;
      showToast(successMessage);
      router.push('/');
      return { message: successMessage };
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
    TSubmitForgotPasswordFormAction,
    FormData | null
  >(submitLoginForm, {});

  // ============================| RENDER |============================ //
  return (
    <form
      action={loginAction}
      className="flex w-full flex-col justify-center gap-4"
      noValidate
    >
      <Input
        inputType="email"
        inputLabel="E-mail"
        name="email"
        error={state.errors?.email?.[0]}
      />

      <Button fullWidth size="lg" type="submit" isLoading={isPending}>
        Reset my password
      </Button>

      <div className="flex items-center justify-center">
        <NavLink href={'/'} variant="light">
          Return to home page
        </NavLink>
      </div>
    </form>
  );
}

export default withErrorBoundaryTrigger(ForgotPasswordForm);
