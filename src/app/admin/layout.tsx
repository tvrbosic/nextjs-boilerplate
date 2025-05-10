// COMPONENTS
import HeaderAdmin from '@/components/layout/header-admin';
import AdminSidebar from '@/app/admin/components/admin-sidebar';

export default function AdminPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-row">
      <HeaderAdmin />

      <div className="bg-tertiary w-1/6 pt-[70px]">
        <AdminSidebar />
      </div>

      <div className="bg-primary flex-1 pt-[70px]">{children}</div>
    </div>
  );
}
