// LIB
import Link from 'next/link';

// TYPES
import { INavLinkProps, TNavLinkVariants } from '@/components/nav-link/types';
import { TComponentSize } from '@/types/theme';

const VARIANT_CLASSES: Record<TNavLinkVariants, string> = {
  default: 'text-stone-100 hover:text-teal-200',
  light: 'text-teal-400 hover:text-teal-200',
  dark: 'text-stone-100 hover:text-teal-200',
};

const SIZE_CLASSES: Record<TComponentSize, string> = {
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
      className={`${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} hover:underline underline-offset-4 duration-300`}
    >
      {children}
    </Link>
  );
}
