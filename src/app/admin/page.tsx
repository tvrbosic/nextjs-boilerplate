'use client';
import { withRoleProtectedComponent } from '@/hoc/role-protected-component';

function AdminPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <p className="mt-4 text-lg">This is the admin page.</p>
    </div>
  );
}

export default withRoleProtectedComponent(AdminPage, ['ADMIN']);
