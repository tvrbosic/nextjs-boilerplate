// TYPES
import { IAdminHeaderProps } from '@/app/admin/components/types';

// COMPONENTS
import ThemeToggle from '@/components/theme-toggle/theme-toggle';
import AuthControl from '@/components/auth-control/auth-control';

export default function AdminHeader({ title }: IAdminHeaderProps) {
  return (
    <div className="flex h-[70px] items-center justify-between px-8">
      <div className="text-main text-lg font-bold">{title}</div>

      <div className="flex items-center justify-end space-x-5">
        <ThemeToggle />

        <AuthControl />
      </div>
    </div>
  );
}
