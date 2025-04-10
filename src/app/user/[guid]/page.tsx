'use client';
// APP
import { withProtectedComponent } from '@/hoc/protected-component';

// COMPONENTS
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AvatarImage from '@/components/avatar-image/avatar-image';
import ProfileForm from '@/app/user/[guid]/components/profile-form';

function UserProfilePage() {
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
              <AvatarImage size="3xl" onEdit={() => {}} />
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
