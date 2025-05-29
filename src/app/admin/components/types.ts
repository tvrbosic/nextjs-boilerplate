export interface IAdminSidebarItemProps {
  text: string;
  selected?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface IAdminHeaderProps {
  title: string;
}
