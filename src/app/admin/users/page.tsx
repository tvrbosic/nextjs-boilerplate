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

      <div className="mx-auto px-8 pt-4">
        <UsersTable />
      </div>
    </div>
  );
}

export default withRoleProtectedComponent(AdminPage, ['ADMIN']);
