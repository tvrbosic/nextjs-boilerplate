'use client';
// LIBRARY
import { use, useRef } from 'react';

// APP
import { withRoleProtectedComponent } from '@/hoc/role-protected-component';
import { UserApiClient } from '@/api-clients/user/user-client';
import { AuthContext } from '@/context/auth/auth-context';
import { ToastMessageContext } from '@/context/toast-message/toast-context';
import { withErrorBoundaryTrigger } from '@/hoc/error-boundary-trigger';
import processAxiosError from '@/utility/process-axios-error';

// TYPES
import { IWithErrorBoundaryTriggerProps } from '@/hoc/types';

// COMPONENTS
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AvatarImage from '@/components/avatar-image/avatar-image';
import ProfileForm from '@/app/user/[guid]/components/profile-form';

function UserProfilePage({
  triggerGlobalError,
}: IWithErrorBoundaryTriggerProps) {
  // ============================| UTILITY |============================ //
  const { user, updateUserAvatar } = use(AuthContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = use(ToastMessageContext);

  // ============================| FUNCTIONS |============================ //
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      try {
        const response = await UserApiClient.instance.uploadAvatar({
          guid: user!.guid,
          file,
        });

        // SUCCESS: Update avatar in AuthContext
        updateUserAvatar(response.data!.avatarImageUrl as string);
        showToast('Avatar uploaded successfully');
      } catch (error) {
        // FAIL
        const errorMessage = processAxiosError({ error });
        errorMessage === '500' && triggerGlobalError();
        showToast(errorMessage, 'error');
      } finally {
        // Reset the file input value
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  // ============================| RENDER |============================ //
  return (
    <div>
      <Header />

      <div className="min-h-dvh w-full">
        <div className="bg-primary h-[250px]" />

        <div className="bg-tertiary flex min-h-[calc(100dvh-250px)] px-20">
          {/* Left container */}
          <div className="w-1/5">
            {/* User image */}
            <div className="relative -top-28">
              <AvatarImage
                size="3xl"
                imageSrc={user?.avatarImageUrl}
                onEdit={() => fileInputRef.current?.click()}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* Right container */}
          <div className="w-4/5 pt-10 pl-20">
            <ProfileForm />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default withRoleProtectedComponent(
  withErrorBoundaryTrigger(UserProfilePage),
  ['USER', 'ADMIN']
);
