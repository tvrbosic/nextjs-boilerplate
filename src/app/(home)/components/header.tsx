// LIBRARY
import Image from 'next/image';

// ASSETS
import LogoIpsumSvg from '@/assets/images/logo-ipsum.svg';

// COMPONENTS
import Navigation from '@/app/(home)/components/navigation';
import AuthControl from '@/app/(home)/components/auth-control';

export default function Header() {
  return (
    <div className="absolute z-10 grid h-[70px] w-full grid-cols-12">
      <div className="col-span-2 flex justify-center">
        <Image src={LogoIpsumSvg} alt="Page logo" />
      </div>

      <div className="col-span-8 flex items-center justify-end pr-10">
        <Navigation />
      </div>

      <div className="col-span-2 flex items-center justify-end pr-5">
        <AuthControl />
      </div>
    </div>
  );
}
