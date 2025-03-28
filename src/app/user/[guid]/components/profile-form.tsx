'use client';
// LIB
import { use } from 'react';

// APP
import { AuthContext } from '@/context/auth/auth-context';

// COMPONENTS
import Input from '@/components/input/input';

export default function ProfileForm() {
  const { user } = use(AuthContext);

  return (
    <div>
      <Input defaultValue={user?.firstName} inputLabel="First name" />
      <Input defaultValue={user?.lastName} inputLabel="Last name" />
      <Input defaultValue={user?.email} inputLabel="Email" inputType="email" />
    </div>
  );
}
