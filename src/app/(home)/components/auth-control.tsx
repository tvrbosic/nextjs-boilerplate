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

// TYPES
import { IWithErrorBoundaryTriggerProps } from '@/hoc/types';

// COMPONENTS
import { withErrorBoundaryTrigger } from '@/hoc/error-boundary-trigger';
import Dropdown from '@/components/dropdown/dropdown';
import DropdownMenuItem from '@/components/dropdown/dropdown-menu-item';
import AvatarImage from '@/components/avatar-image/avatar-image';
import Button from '@/components/button/button';

function AuthControl({ triggerGlobalError }: IWithErrorBoundaryTriggerProps) {
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
      errorMessage === '500' && triggerGlobalError();
      showToast(errorMessage, 'error');
    }
  };

  // ============================| RENDER |============================ //
  return (
    <div className="flex items-center justify-center gap-4">
      {user ? (
        <>
          <div className="flex flex-col text-end text-teal-100">
            <p>{`${user?.firstName} ${user?.lastName}`} </p>
            <p>{user.role} </p>
          </div>

          <div>
            <Dropdown menuAlignment="right" activateElement={<AvatarImage />}>
              <DropdownMenuItem
                text="Profile"
                icon={<FaUserCircle size={20} />}
                onClick={() => router.push('/user/profile')}
              />

              <DropdownMenuItem
                text="Sign out"
                icon={<FaSignOutAlt size={20} />}
                onClick={logoutHandler}
              />
            </Dropdown>
          </div>
        </>
      ) : (
        <Link href={'/sign-in'}>
          <Button variant="outline">Sign in</Button>
        </Link>
      )}
    </div>
  );
}

export default withErrorBoundaryTrigger(AuthControl);
