'use client';
// LIB
import { use, useActionState } from 'react';
import { useParams, useRouter } from 'next/navigation';

// APP
import { AuthApiClient } from '@/api-clients/auth/auth-client';
import { AuthContext } from '@/context/auth/auth-context';
import { ToastMessageContext } from '@/context/toast-message/toast-context';
import { resetPasswordValidationSchema } from '@/app/(auth)/validations';
import processAxiosError from '@/utility/process-axios-error/process-axios-error';

// TYPES
import { IWithErrorBoundaryTriggerProps } from '@/hoc/types';
import { TSubmitResetPasswordFormAction } from '@/app/(auth)/types';

// COMPONENTS
import { withErrorBoundaryTrigger } from '@/hoc/error-boundary-trigger';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import NavLink from '@/components/nav-link/nav-link';

function ForgotPasswordForm({
  triggerGlobalError,
}: IWithErrorBoundaryTriggerProps) {
  // ============================| STATE |============================ //
  const { token } = useParams<{ token: string }>();

  // ============================| UTILITY |============================ //
  const { clearUser } = use(AuthContext);
  const { showToast } = use(ToastMessageContext);
  const router = useRouter();

  // ============================| FUNCTIONS |============================ //
  const submitLoginForm = async (
    previous: TSubmitResetPasswordFormAction,
    formData: FormData | null
  ): Promise<TSubmitResetPasswordFormAction> => {
    // Reset errors (by calling function with formData null and returning initial state / empty object)
    if (!formData) {
      return {};
    }

    const newPassword = formData.get('newPassword') as string;
    const newPasswordConfirm = formData.get('newPasswordConfirm') as string;

    // Validate form data
    const validationResult = resetPasswordValidationSchema.safeParse({
      newPassword,
      newPasswordConfirm,
    });

    // Return validation errors if any
    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    try {
      // Call API to sent password reset link
      const response = await AuthApiClient.instance.resetPassword({
        token,
        newPassword,
        newPasswordConfirm,
      });

      // SUCCESS: Clear currently logged in user, show toast message, redirect to home page and return form data
      const successMessage = response.message;
      clearUser();
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
    TSubmitResetPasswordFormAction,
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
        inputType="password"
        inputLabel="New password"
        name="newPassword"
        error={state.errors?.newPassword?.[0]}
      />
      <Input
        inputType="password"
        inputLabel="Confirm password"
        name="newPasswordConfirm"
        error={state.errors?.newPasswordConfirm?.[0]}
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
