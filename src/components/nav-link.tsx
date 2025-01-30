import Link, { LinkProps } from 'next/link';

export default function NavLink({
  children,
  ...props
}: LinkProps & { children?: React.ReactNode | undefined }) {
  return (
    <Link
      {...props}
      className="text-stone-100 text-lg hover:text-teal-100 hover:underline underline-offset-2 duration-300"
    >
      {children}
    </Link>
  );
}
