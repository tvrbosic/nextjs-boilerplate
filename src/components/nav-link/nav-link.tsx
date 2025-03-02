// LIB
import Link from 'next/link';

// TYPES
import { INavLinkProps, TNavLinkVariants } from '@/components/nav-link/types';
import { TComponentSize } from '@/types/theme';

const variantClasses: Record<TNavLinkVariants, string> = {
  default: 'text-stone-100 hover:text-teal-200',
  light: 'text-teal-400 hover:text-teal-200',
  dark: 'text-stone-100 hover:text-teal-200',
};

const sizeClasses: Record<TComponentSize, string> = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
};

export default function NavLink({
  children,
  variant = 'default',
  size = 'md',
  ...props
}: INavLinkProps) {
  return (
    <Link
      {...props}
      className={`${variantClasses[variant]} ${sizeClasses[size]} hover:underline underline-offset-4 duration-300`}
    >
      {children}
    </Link>
  );
}
