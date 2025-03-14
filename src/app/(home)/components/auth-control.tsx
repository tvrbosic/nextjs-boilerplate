'use client';
// LIB
import { use } from 'react';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';

// APP
import { AuthContext } from '@/context/auth/auth-context';

// COMPONENTS
import DropdownMenu from '@/components/dropdown-menu/dropdown-menu';
import DropdownMenuItem from '@/components/dropdown-menu/dropdown-menu-item';
import AvatarImage from '@/components/avatar-image/avatar-image';
import Button from '@/components/button/button';

export default function AuthControl() {
  const { user } = use(AuthContext);

  return (
    <div>
      {user ? (
        <DropdownMenu activateElement={<AvatarImage />} menuAlignment="right">
          <DropdownMenuItem text="Profile" icon={<FaUserCircle size={20} />} />
          <DropdownMenuItem text="WASD" icon={<FaUserCircle size={20} />} />
          <DropdownMenuItem text="Logout" icon={<FaSignOutAlt size={20} />} />
        </DropdownMenu>
      ) : (
        <Link href={'/sign-in'}>
          <Button variant="outline">Sign in</Button>
        </Link>
      )}
    </div>
  );
}
