//
export type TMenuAlignment = 'left' | 'right';

export interface IDropdownMenuProps {
  activateElement: React.ReactNode;
  children: React.ReactNode;
  menuAlignment?: TMenuAlignment;
}

export interface IDropdownMenuItemProps {
  text: string;
  icon?: React.ReactNode;
}
