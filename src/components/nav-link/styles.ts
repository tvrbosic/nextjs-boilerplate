// TYPES
import { TComponentSize } from '@/types/theme';
import { TNavLinkVariants } from '@/components/nav-link/types';

export const COMMON = 'underline-offset-4 duration-300 hover:underline';

export const VARIANTS: Record<TNavLinkVariants, string> = {
  primary: `text-teal-700 hover:text-teal-500 
    dark:text-teal-100 dark:hover:text-teal-200`,
  secondary: `text-stone-100/80 hover:text-teal-500 
    dark:text-teal-500 dark:hover:text-teal-200`,
};

export const SIZES: Partial<Record<TComponentSize, string>> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};
