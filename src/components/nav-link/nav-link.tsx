// LIB
import Link from 'next/link';

// TYPES
import { INavLinkProps, TNavLinkVariants } from '@/components/nav-link/types';
import { TComponentSize } from '@/types/theme';

// STYLES
import styles from '@/components/nav-link/styles';

const VARIANT_CLASSES: Record<TNavLinkVariants, string> = {
  light: styles.navlink_light,
  dark: styles.navlink_dark,
};

const SIZE_CLASSES: Record<TComponentSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export default function NavLink({
  children,
  variant = 'light',
  size = 'md',
  ...props
}: INavLinkProps) {
  return (
    <Link
      {...props}
      className={`${styles.navlink_common} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]}`}
    >
      {children}
    </Link>
  );
}
