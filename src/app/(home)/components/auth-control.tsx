'use client';
// LIB
import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';

// APP
import { AuthContext } from '@/context/auth/auth-context';
import { ToastMessageContext } from '@/context/toast-message/toast-context';
import { AuthApiClient } from '@/api-clients/auth/auth-client';
import processAxiosError from '@/utility/process-axios-error/process-axios-error';

// COMPONENTS
import DropdownMenu from '@/components/dropdown-menu/dropdown-menu';
import DropdownMenuItem from '@/components/dropdown-menu/dropdown-menu-item';
import AvatarImage from '@/components/avatar-image/avatar-image';
import Button from '@/components/button/button';

export default function AuthControl() {
  // ============================| UTILITY |============================ //
  const { user, clearUser } = use(AuthContext);
  const { showToast } = use(ToastMessageContext);
  const router = useRouter();

  // ============================| FUNCTIONS |============================ //
  const logoutHandler = async () => {
    try {
      await AuthApiClient.instance.logout();
      showToast('Sign out successful');
      clearUser();
      router.push('/');
    } catch (error) {
      const errorMessage = processAxiosError({ error });
      showToast(errorMessage, 'error');
    }
  };

  // ============================| RENDER |============================ //
  return (
    <div>
      {user ? (
        <DropdownMenu activateElement={<AvatarImage />} menuAlignment="right">
          <DropdownMenuItem
            text="Profile"
            icon={<FaUserCircle size={20} />}
            onClick={() => router.push('/user/profile')}
          />
          <DropdownMenuItem text="wasd" icon={<FaUserCircle size={20} />} />
          <DropdownMenuItem
            text="Sign out"
            icon={<FaSignOutAlt size={20} />}
            onClick={logoutHandler}
          />
        </DropdownMenu>
      ) : (
        <Link href={'/user/sign-in'}>
          <Button variant="outline">Sign in</Button>
        </Link>
      )}
    </div>
  );
}
