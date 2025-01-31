interface IIconButtonProps {
  icon: React.ReactElement;
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export default function IconButton({ icon, onClick }: IIconButtonProps) {
  return (
    <span
      className="text-stone-200 text-4xl hover:text-teal-200 hover:cursor-pointer duration-300"
      onClick={onClick}
    >
      {icon}
    </span>
  );
}
