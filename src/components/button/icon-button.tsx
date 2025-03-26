// TYPES
import { IIconButtonProps } from '@/components/button/types';

// STYLES
import { ICON_BUTTON } from '@/components/button/styles';

export default function IconButton({ icon, onClick }: IIconButtonProps) {
  return (
    <span className={ICON_BUTTON} onClick={onClick}>
      {icon}
    </span>
  );
}
