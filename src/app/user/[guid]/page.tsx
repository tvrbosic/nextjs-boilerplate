// COMPONENTS
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AvatarImage from '@/components/avatar-image/avatar-image';

export default function Page() {
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
              <AvatarImage size="3xl" />
            </div>
          </div>

          {/* Right container */}
          <div className="w-4/5">
            <div>Firstname Lastname</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
