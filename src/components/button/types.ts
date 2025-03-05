import { TComponentSize } from '@/types/theme';

export type TButtonVariant = 'solid' | 'outline';

export interface IButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  size?: TComponentSize;
  variant?: TButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface IIconButtonProps {
  icon: React.ReactElement;
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}
