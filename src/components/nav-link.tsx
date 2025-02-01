import Link, { LinkProps } from 'next/link';

interface INavLinkProps extends LinkProps {
  children?: React.ReactNode | undefined;
}

export default function NavLink({ children, ...props }: INavLinkProps) {
  return (
    <Link
      {...props}
      className="text-stone-100 text-lg hover:text-teal-200 hover:underline underline-offset-4 duration-300"
    >
      {children}
    </Link>
  );
}
