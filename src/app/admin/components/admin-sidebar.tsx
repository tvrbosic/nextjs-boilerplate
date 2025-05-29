'use client';
// LIBRARY
import { usePathname, useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import { MdKeyboardReturn } from 'react-icons/md';

// COMPONENTS
import LogoIpsum from '@/components/logo/logo-ipsum';
import AdminSidebarItem from '@/app/admin/components/admin-sidebar-item';

export default function AdminSidebar() {
  // ============================| UTILITY |============================ //
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-full">
      <div className="flex h-[70px] items-center justify-center border-b border-(--secondary-color)">
        <LogoIpsum />
      </div>

      <div className="items-left flex flex-col">
        <AdminSidebarItem
          text="Users"
          icon={<FaUser />}
          onClick={() => router.push('/admin/users')}
          selected={pathname === '/admin/users'}
        />

        <AdminSidebarItem
          text="Back to Home"
          icon={<MdKeyboardReturn />}
          onClick={() => router.push('/')}
          selected={pathname === '/'}
        />
      </div>
    </div>
  );
}
