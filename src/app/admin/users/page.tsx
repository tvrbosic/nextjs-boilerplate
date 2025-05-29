'use client';
// APP
import { withRoleProtectedComponent } from '@/hoc/role-protected-component';

// COMPONENTS
import AdminHeader from '@/app/admin/components/admin-header';
import UsersTable from '@/app/admin/users/components/users-table';

function AdminPage() {
  return (
    <div>
      <AdminHeader title="Adminstrate users" />

      <UsersTable />
    </div>
  );
}

export default withRoleProtectedComponent(AdminPage, ['ADMIN']);
