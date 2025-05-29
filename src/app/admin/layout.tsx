// COMPONENTS
import AdminSidebar from '@/app/admin/components/admin-sidebar';

export default function AdminPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-row">
      <div className="bg-tertiary w-1/6">
        <AdminSidebar />
      </div>

      <div className="bg-primary flex-1">{children}</div>
    </div>
  );
}
