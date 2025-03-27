// COMPONENTS
import LogoIpsum from '@/components/logo/logo-ipsum';
import Navigation from '@/app/(home)/components/navigation';
import AuthControl from '@/app/(home)/components/auth-control';
import ThemeToggle from '@/app/(home)/components/theme-toggle';

export default function Header() {
  return (
    <div className="absolute z-10 grid h-[70px] w-full grid-cols-12">
      <div className="col-span-2 flex items-center justify-center">
        <LogoIpsum />
      </div>

      <div className="col-span-7 flex items-center justify-end pr-5">
        <Navigation />
      </div>

      <div className="col-span-3 flex items-center justify-end space-x-5 pr-5">
        <ThemeToggle />
        <AuthControl />
      </div>
    </div>
  );
}
