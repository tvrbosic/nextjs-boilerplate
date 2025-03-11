// LIB
import Link from 'next/link';

// TYPES
import { INavLinkProps, TNavLinkVariants } from '@/components/nav-link/types';
import { TComponentSize } from '@/types/theme';

// STYLES
import styles from '@/components/nav-link/styles.module.css';

const VARIANT_CLASSES: Record<TNavLinkVariants, string> = {
  light: styles.navlink_light,
  dark: styles.navlink_dark,
};

const SIZE_CLASSES: Record<TComponentSize, string> = {
  sm: styles.navlink_small,
  md: styles.navlink_medium,
  lg: styles.navlink_large,
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
