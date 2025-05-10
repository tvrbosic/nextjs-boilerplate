interface IAdminSidebarItemProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export default function AdminSidebarItem({
  text,
  icon,
  onClick,
}: IAdminSidebarItemProps) {
  return (
    <div className="flex items-center justify-center border-blue-200/60 px-6 py-2 text-teal-100 hover:cursor-pointer hover:border-r-4 hover:bg-blue-200/20 hover:text-teal-300">
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
