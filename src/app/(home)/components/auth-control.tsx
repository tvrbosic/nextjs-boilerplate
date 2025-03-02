'use client';
// LIB
import { use } from 'react';
import Link from 'next/link';

// APP
import { AuthContext } from '@/context/auth/auth-context';

// COMPONENTS
import AvatarImage from '@/components/avatar-image/avatar-image';
import Button from '@/components/button/button';

export default function AuthControl() {
  const { user } = use(AuthContext);

  return (
    <div>
      {user ? (
        <AvatarImage />
      ) : (
        <Link href={'/sign-in'}>
          <Button variant="outline">Sign in</Button>
        </Link>
      )}
    </div>
  );
}
