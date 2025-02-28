'use client';
// LIBRARY
import Image from 'next/image';
import { useState } from 'react';

// ASSETS
import LogoIpsumSvg from '@/app/(home)/assets/logo-ipsum.svg';

// COMPONENTS
import Navigation from '@/app/(home)/components/navigation';
import ToggleSwitch from '@/components/toggle-switch/toggle-switch';

export default function Header() {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="absolute w-full h-[70px] z-10 grid grid-cols-12">
      <div className="col-span-2 flex justify-center">
        <Image src={LogoIpsumSvg} alt="Page logo" />
      </div>

      <div className="col-span-9 flex justify-end items-center pr-10 ">
        <Navigation />
      </div>

      <div className="col-span-1 flex justify-center items-center">
        <ToggleSwitch checked={isChecked} onChange={handleToggle} />
      </div>
    </div>
  );
}
