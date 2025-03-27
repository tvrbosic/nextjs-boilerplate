// TYPES
import { IDropdownMenuItemProps } from '@/components/dropdown/types';

// STYLES
import { DROPDOWN_MENU_ITEM } from '@/components/dropdown/styles';

export default function DropdownMenuItem({
  text,
  icon,
  onClick,
}: IDropdownMenuItemProps) {
  return (
    <div className={DROPDOWN_MENU_ITEM}>
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
