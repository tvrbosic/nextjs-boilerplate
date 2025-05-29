import clsx from 'clsx';

// TYPES
import { IAdminSidebarItemProps } from '@/app/admin/components/types';

export default function AdminSidebarItem({
  text,
  icon,
  selected = false,
  onClick,
}: IAdminSidebarItemProps) {
  const itemClasses = clsx(
    'flex items-center justify-center px-6 py-2 text-teal-100 hover:cursor-pointer hover:border-r-4 hover:bg-blue-200/20 hover:text-teal-300',
    {
      'border-r-4 border-blue-400 bg-blue-200/30 text-teal-300': selected,
    }
  );

  return (
    <div className={itemClasses}>
      {icon && (
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center">
          {icon}
        </div>
      )}
      <div className="ml-2 flex flex-1 items-center" onClick={onClick}>
        {text}
      </div>
    </div>
  );
}
