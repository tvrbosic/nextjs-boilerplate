import { TComponentSize } from '@/types/theme';

export type TButtonVariant = 'solid' | 'outline';

export interface IButtonProps {
  disabled?: boolean;
  size?: TComponentSize;
  variant?: TButtonVariant;
  children: React.ReactNode;
  fill?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface IIconButtonProps {
  icon: React.ReactElement;
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}
