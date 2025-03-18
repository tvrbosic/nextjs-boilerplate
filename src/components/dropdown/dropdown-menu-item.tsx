// TYPES
import { IDropdownMenuItemProps } from '@/components/dropdown/types';

// STYLES
import styles from '@/components/dropdown/styles.module.css';

export default function DropdownMenuItem({
  text,
  icon,
  onClick,
}: IDropdownMenuItemProps) {
  return (
    <div className={styles.dropdown_menu_item}>
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
