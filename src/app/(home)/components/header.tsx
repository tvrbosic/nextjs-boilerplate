// LIBRARY
import Image from 'next/image';

// ASSETS
import LogoIpsumSvg from '@/assets/images/logo-ipsum.svg';

// COMPONENTS
import Navigation from '@/app/(home)/components/navigation';
import AuthControl from '@/app/(home)/components/auth-control';

export default function Header() {
  return (
    <div className="absolute w-full h-[70px] z-10 grid grid-cols-12">
      <div className="col-span-2 flex justify-center">
        <Image src={LogoIpsumSvg} alt="Page logo" />
      </div>

      <div className="col-span-9 flex justify-end items-center pr-10 ">
        <Navigation />
      </div>

      <div className="col-span-1 flex justify-center items-center">
        <AuthControl />
      </div>
    </div>
  );
}
