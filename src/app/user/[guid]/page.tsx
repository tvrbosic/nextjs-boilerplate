'use client';
// LIBRARY
import { use, useRef } from 'react';

// APP
import { withProtectedComponent } from '@/hoc/protected-component';
import { UserApiClient } from '@/api-clients/user/user-client';
import { AuthContext } from '@/context/auth/auth-context';

// COMPONENTS
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AvatarImage from '@/components/avatar-image/avatar-image';
import ProfileForm from '@/app/user/[guid]/components/profile-form';

function UserProfilePage() {
  const { user } = use(AuthContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      try {
        await UserApiClient.instance.uploadAvatar({
          guid: user!.guid,
          file,
        });

        // Handle success (e.g., refresh avatar or show success message)
        console.log('Avatar uploaded successfully');
      } catch (error) {
        console.error('Failed to upload avatar', error);
      } finally {
        // Reset the file input value
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

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

export default withProtectedComponent(UserProfilePage);
