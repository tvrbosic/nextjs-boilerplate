// LIB
import Link from 'next/link';

// TYPES
import { INavLinkProps } from '@/components/nav-link/types';

// STYLES
import { COMMON, VARIANTS, SIZES } from '@/components/nav-link/styles';

export default function NavLink({
  children,
  variant = 'primary',
  size = 'md',
  ...props
}: INavLinkProps) {
  return (
    <Link
      {...props}
      className={`${COMMON} ${VARIANTS[variant]} ${SIZES[size]}`}
    >
      {children}
    </Link>
  );
}
