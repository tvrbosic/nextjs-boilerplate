export type TMenuAlignment = 'left' | 'right';

export interface IDropdownMenuProps {
  activateElement: React.ReactNode;
  menuAlignment?: TMenuAlignment;
}
