// LIB
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// APP
import { AuthContext } from '@/context/auth/auth-context';

export function withRoleProtectedComponent<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[] // e.g., ['ADMIN']
) {
  const RoleProtectedComponentWrapper = (props: P) => {
    const router = useRouter();
    const { user } = useContext(AuthContext);

    useEffect(() => {
      if (!user) {
        router.replace('/sign-in');
        return;
      }

      if (!allowedRoles.includes(user.role)) {
        router.replace('/not-authorized'); // TODO: create a 403 page
      }
    }, [user, router]);

    if (!user || !allowedRoles.includes(user.role)) return null;

    return <WrappedComponent {...props} />;
  };

  return RoleProtectedComponentWrapper;
}
