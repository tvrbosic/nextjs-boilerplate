'use client';
// LIB
import { use, useActionState } from 'react';
import { useRouter } from 'next/navigation';

// APP
import { AuthContext } from '@/context/auth/auth-context';
import { ToastMessageContext } from '@/context/toast-message/toast-context';
import {
  partialUpdateUserValidationSchema,
  updatePasswordValidationSchema,
} from '@/app/user/validations';
import { UserApiClient } from '@/api-clients/user/user-client';
import processAxiosError from '@/utility/process-axios-error';
import { withErrorBoundaryTrigger } from '@/hoc/error-boundary-trigger';

// TYPES
import {
  TSubmitUpdatePasswordFormAction,
  TSubmitUpdateProfileFormAction,
} from '@/app/user/types';
import { IWithErrorBoundaryTriggerProps } from '@/hoc/types';

// COMPONENTS
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import { AuthApiClient } from '@/api-clients/auth/auth-client';

function ProfileForm({ triggerGlobalError }: IWithErrorBoundaryTriggerProps) {
  // ============================| UTILITY |============================ //
  const { user, setUser, clearUser } = use(AuthContext);
  const { showToast } = use(ToastMessageContext);
  const router = useRouter();

  // ============================| FUNCTIONS |============================ //
  const submitUpdateProfileForm = async (
    previous: TSubmitUpdateProfileFormAction,
    formData: FormData | null
  ): Promise<TSubmitUpdateProfileFormAction> => {
    // Reset errors (by calling function with formData null and returning initial state / empty object)
    if (!formData) {
      return {};
    }

    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    // Validate form data
    const validationResult = partialUpdateUserValidationSchema.safeParse({
      email,
      firstName,
      lastName,
    });

    // Return validation errors if any
    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    try {
      // Call API to login user
      const response = await UserApiClient.instance.partialUpdateUser({
        guid: user?.guid!,
        user: { email, firstName, lastName },
      });

      // SUCCESS: Update user data in context, show toast message
      setUser({
        ...user!,
        email: response.data!.email,
        firstName: response.data!.firstName,
        lastName: response.data!.lastName,
      });
      showToast('User updated successfully', 'success');
      return { email, firstName, lastName };
    } catch (error) {
      // FAIL: Show toast message and return API error
      const errorMessage = processAxiosError({ error });
      errorMessage === '500' && triggerGlobalError();
      showToast(errorMessage, 'error');
      return { errors: { api: [errorMessage] } };
    }
  };

  const submitUpdatePasswordForm = async (
    previous: TSubmitUpdatePasswordFormAction,
    formData: FormData | null
  ): Promise<TSubmitUpdatePasswordFormAction> => {
    // Reset errors (by calling function with formData null and returning initial state / empty object)
    if (!formData) {
      return {};
    }

    const newPassword = formData.get('newPassword') as string;
    const newPasswordConfirm = formData.get('newPasswordConfirm') as string;
    const oldPassword = formData.get('oldPassword') as string;

    // Validate form data
    const validationResult = updatePasswordValidationSchema.safeParse({
      newPassword,
      newPasswordConfirm,
      oldPassword,
    });

    // Return validation errors if any
    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    try {
      // Call API to update user password
      const response = await UserApiClient.instance.updatePassword({
        guid: user?.guid!,
        passwords: { oldPassword, newPassword, newPasswordConfirm },
      });

      // SUCCESS: Show toast message, logout user, clear user from context and redirect to login
      showToast(
        'User password updated successfully, please log in again',
        'success'
      );
      await AuthApiClient.instance.logout();
      clearUser();
      router.push('/sign-in');
      return { errors: undefined };
    } catch (error) {
      // FAIL: Show toast message and return API error
      const errorMessage = processAxiosError({ error });
      errorMessage === '500' && triggerGlobalError();
      showToast(errorMessage, 'error');
      return { errors: { api: [errorMessage] } };
    }
  };

  // ============================| ACTION |============================ //
  const [profileFormState, updateProfileAction, updateProfileIsPending] =
    useActionState<TSubmitUpdateProfileFormAction, FormData | null>(
      submitUpdateProfileForm,
      {}
    );

  const [passwordFormState, updatePasswordAction, updatePasswordIsPending] =
    useActionState<TSubmitUpdatePasswordFormAction, FormData | null>(
      submitUpdatePasswordForm,
      {}
    );

  // ============================| RENDER |============================ //
  return (
    <div className="flex space-x-5">
      <form action={updateProfileAction} className="flex-1 space-y-2">
        <Input
          defaultValue={user?.firstName}
          name="firstName"
          inputLabel="First name"
          labelStyle="light"
          error={profileFormState.errors?.firstName?.[0]}
        />

        <Input
          defaultValue={user?.lastName}
          name="lastName"
          inputLabel="Last name"
          labelStyle="light"
          error={profileFormState.errors?.lastName?.[0]}
        />

        <Input
          defaultValue={user?.email}
          name="email"
          inputLabel="Email"
          inputType="email"
          labelStyle="light"
          error={profileFormState.errors?.email?.[0]}
        />

        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            variant="solidInverse"
            isLoading={updateProfileIsPending}
          >
            Save profile
          </Button>
        </div>
      </form>

      <form className="flex-1 space-y-2" action={updatePasswordAction}>
        <Input
          name="newPassword"
          inputLabel="New password"
          inputType="password"
          labelStyle="light"
          error={passwordFormState.errors?.newPassword?.[0]}
        />

        <Input
          name="newPasswordConfirm"
          inputLabel="New password confirm"
          inputType="password"
          labelStyle="light"
          error={passwordFormState.errors?.newPasswordConfirm?.[0]}
        />

        <Input
          name="oldPassword"
          inputLabel="Old password"
          inputType="password"
          labelStyle="light"
          error={passwordFormState.errors?.oldPassword?.[0]}
        />

        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            variant="solidInverse"
            isLoading={updatePasswordIsPending}
          >
            Update password
          </Button>
        </div>
      </form>
    </div>
  );
}

export default withErrorBoundaryTrigger(ProfileForm);
