import { LinkProps } from 'next/link';
import { TComponentSize } from '@/types/theme';

export type TNavLinkVariants = 'light' | 'dark';

export interface INavLinkProps extends LinkProps {
  children?: React.ReactNode | undefined;
  variant?: TNavLinkVariants;
  size?: TComponentSize;
}
