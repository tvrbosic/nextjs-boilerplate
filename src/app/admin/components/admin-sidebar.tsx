'use client';
// LIBRARY
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import { MdKeyboardReturn } from 'react-icons/md';

// COMPONENTS
import AdminSidebarItem from '@/app/admin/components/admin-sidebar-item';

export default function AdminSidebar() {
  // ============================| UTILITY |============================ //
  const router = useRouter();

  return (
    <div className="h-full border-t border-(--secondary-color) pt-[10%]">
      <div className="items-left flex flex-col">
        <AdminSidebarItem
          text="Users"
          icon={<FaUser />}
          onClick={() => router.push('/admin/users')}
        />
        <AdminSidebarItem
          text="Back to Home"
          icon={<MdKeyboardReturn />}
          onClick={() => router.push('/')}
        />
      </div>
    </div>
  );
}
