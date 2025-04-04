'use client';
// LIB
import { use, useActionState } from 'react';

// APP
import { AuthContext } from '@/context/auth/auth-context';
import { ToastMessageContext } from '@/context/toast-message/toast-context';
import { partialUpdateUserValidationSchema } from '@/app/user/validations';
import { UserApiClient } from '@/api-clients/user/user-client';
import processAxiosError from '@/utility/process-axios-error/process-axios-error';
import { withErrorBoundaryTrigger } from '@/hoc/error-boundary-trigger';

// TYPES
import { TSubmitUpdateProfileFormAction } from '@/app/user/types';
import { IWithErrorBoundaryTriggerProps } from '@/hoc/types';

// COMPONENTS
import Input from '@/components/input/input';
import Button from '@/components/button/button';

function ProfileForm({ triggerGlobalError }: IWithErrorBoundaryTriggerProps) {
  // ============================| UTILITY |============================ //
  const { user, setUser } = use(AuthContext);
  const { showToast } = use(ToastMessageContext);

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

  // ============================| ACTION |============================ //
  const [state, updateProfileAction, isPending] = useActionState<
    TSubmitUpdateProfileFormAction,
    FormData | null
  >(submitUpdateProfileForm, {});

  // ============================| RENDER |============================ //
  return (
    <div className="flex space-x-5">
      <form action={updateProfileAction} className="flex-1 space-y-2">
        <Input
          defaultValue={user?.firstName}
          name="firstName"
          inputLabel="First name"
          labelStyle="light"
          error={state.errors?.firstName?.[0]}
        />

        <Input
          defaultValue={user?.lastName}
          name="lastName"
          inputLabel="Last name"
          labelStyle="light"
          error={state.errors?.lastName?.[0]}
        />

        <Input
          defaultValue={user?.email}
          name="email"
          inputLabel="Email"
          inputType="email"
          labelStyle="light"
          error={state.errors?.email?.[0]}
        />

        <div className="mt-6 flex justify-end">
          <Button type="submit" variant="solidInverse" isLoading={isPending}>
            Save profile
          </Button>
        </div>
      </form>

      <div className="flex-1 space-y-2">
        <Input
          inputLabel="New password"
          inputType="password"
          labelStyle="light"
        />

        <Input
          inputLabel="New password confirm"
          inputType="password"
          labelStyle="light"
        />

        <Input
          inputLabel="Old password"
          inputType="password"
          labelStyle="light"
        />

        <div className="mt-6 flex justify-end">
          <Button onClick={() => {}} variant="solidInverse">
            Update password
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundaryTrigger(ProfileForm);
