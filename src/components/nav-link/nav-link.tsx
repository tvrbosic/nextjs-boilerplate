// LIB
import Link from 'next/link';

// TYPES
import { INavLinkProps } from '@/components/nav-link/types';

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
