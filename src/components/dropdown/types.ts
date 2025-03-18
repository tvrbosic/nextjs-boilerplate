import { TComponentSize } from '@/types/theme';

export type TMenuAlignment = 'left' | 'right';

export interface IDropdownProps {
  text: string;
  children: React.ReactNode;
  activateElement?: React.ReactNode;
  menuAlignment?: TMenuAlignment;
}

export type TDropdonwButtonVariant = 'solid' | 'outline';

export interface IDropdownButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  size?: TComponentSize;
  variant?: TDropdonwButtonVariant;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface IDropdownMenuItemProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}
