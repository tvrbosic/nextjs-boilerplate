// LIB
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// APP
import { AuthContext } from '@/context/auth/auth-context';

export function withProtectedComponent<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const protectedComponentWrapper = (props: P) => {
    const router = useRouter();
    const { user } = useContext(AuthContext);

    useEffect(() => {
      if (!user) {
        router.replace('/sign-in');
      }
    }, [user, router]);

    if (!user) return null; // Prevent rendering until redirect happens

    return <WrappedComponent {...props} />;
  };

  return protectedComponentWrapper;
}
