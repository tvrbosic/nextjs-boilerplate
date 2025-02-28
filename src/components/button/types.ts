export interface IButtonProps {
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline';
  children: React.ReactNode;
  fill?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface IIconButtonProps {
  icon: React.ReactElement;
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}
