// COMPONENTS
import LogoIpsum from '@/components/logo/logo-ipsum';
import AuthControl from '@/components/auth-control/auth-control';
import ThemeToggle from '@/components/theme-toggle/theme-toggle';

export default function HeaderAdmin() {
  return (
    <div className="absolute z-10 grid h-[70px] w-full grid-cols-12">
      <div className="col-span-2 flex items-center justify-center">
        <LogoIpsum />
      </div>

      <div className="col-span-7 flex items-center justify-center pr-5">
        <h1 className="text-title text-2xl font-bold dark:text-teal-100">
          Admin Dashboard
        </h1>
      </div>

      <div className="col-span-3 flex items-center justify-end space-x-5 pr-5">
        <ThemeToggle />

        <AuthControl />
      </div>
    </div>
  );
}
