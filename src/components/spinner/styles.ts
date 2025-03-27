import { TComponentSize } from '@/types/theme';
import { TSpinnerVariant } from '@/components/spinner/types';

export const VARIANTS: Record<TSpinnerVariant, string> = {
  light: `fill-slate-700 text-emerald-700 
    dark:text-emerald-700`,
  dark: `fill-slate-200 text-emerald-300
    dark:text-emerald-300`,
};

export const SIZES: Record<TComponentSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};
