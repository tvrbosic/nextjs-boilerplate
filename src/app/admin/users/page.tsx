'use client';
// APP
import { withRoleProtectedComponent } from '@/hoc/role-protected-component';

// COMPONENTS

function AdminPage() {
  return <div className="flex h-full items-center justify-center">TODO</div>;
}

export default withRoleProtectedComponent(AdminPage, ['ADMIN']);
