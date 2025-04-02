// TYPES
import { TComponentSize } from '@/types/theme';
import { TButtonVariant } from '@/components/button/types';

// ============================| BUTTON |============================ //
export const COMMON =
  'me-2 mb-2 cursor-pointer rounded-lg focus:ring-4 focus:outline-none';

export const DISABLED = 'cursor-not-allowed opacity-50';

export const VARIANTS: Record<TButtonVariant, string> = {
  solid: `duration-300 text-stone-100 border-1 border-transparent hover:text-stone-200 focus:ring-teal-500/40 
    bg-teal-600 hover:bg-teal-500 hover:border-teal-700/50
    dark:bg-teal-500 dark:hover:bg-teal-600`,
  solidInverse: `duration-300 text-stone-100 border-1 border-transparent hover:text-stone-200 focus:ring-teal-500/40 
    bg-teal-500 hover:bg-teal-600 hover:border-teal-400/50
    dark:bg-teal-600 dark:hover:bg-teal-500`,
  outline: `border duration-300 focus:ring-teal-300/40 
    border-teal-700 text-teal-700 hover:border-teal-500 hover:text-teal-500 hover:bg-teal-500/10
    dark:border-stone-100 dark:text-stone-100 dark:hover:border-teal-500 dark:hover:bg-transparent`,
  outlineInverse: `border duration-300 focus:ring-teal-300/40 
    border-teal-300 text-teal-300 hover:border-teal-200 hover:text-teal-200 hover:bg-teal-100/10
    dark:border-stone-100 dark:text-stone-100 dark:hover:border-teal-500 dark:hover:bg-transparent`,
};

export const SIZES: Partial<Record<TComponentSize, string>> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-lg',
};

// ============================| ICON BUTTON |============================ //
export const ICON_BUTTON =
  'text-4xl duration-300 hover:cursor-pointer text-teal-700 hover:text-teal-500 dark:text-stone-200 dark:hover:text-teal-200';
