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
    <div className="flex space-x-5">
      <div className="flex-1 space-y-2">
        <Input
          defaultValue={user?.firstName}
          inputLabel="First name"
          labelStyle="light"
        />
        <Input
          defaultValue={user?.lastName}
          inputLabel="Last name"
          labelStyle="light"
        />
        <Input
          defaultValue={user?.email}
          inputLabel="Email"
          inputType="email"
          labelStyle="light"
        />
      </div>

      <div className="flex-1 space-y-2">
        <Input
          inputLabel="New password"
          inputType="password"
          labelStyle="light"
        />
        <Input
          inputLabel="New password confirm"
          inputType="password"
          labelStyle="light"
        />
        <Input
          inputLabel="Old password"
          inputType="password"
          labelStyle="light"
        />
      </div>
    </div>
  );
}
