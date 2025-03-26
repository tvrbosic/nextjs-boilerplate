// TYPES
import { TComponentSize } from '@/types/theme';
import { TButtonVariant } from '@/components/button/types';

// ============================| BUTTON |============================ //
export const COMMON =
  'me-2 mb-2 cursor-pointer rounded-lg focus:ring-4 focus:outline-none';

export const DISABLED = 'cursor-not-allowed opacity-50';

export const VARIANTS: Record<TButtonVariant, string> = {
  solid:
    'bg-teal-500 text-stone-100 duration-300 hover:bg-teal-600 focus:ring-teal-500/40',
  outline:
    'border border-teal-700 text-teal-700 duration-300 hover:border-teal-500 hover:text-teal-500 hover:bg-teal-500/10 focus:ring-teal-300/40 dark:border-stone-100 dark:text-stone-100 dark:hover:border-teal-500 hover:text-teal-500 hover:bg-transparent focus:ring-teal-300/40',
};

export const SIZES: Record<TComponentSize, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-lg',
};

// ============================| ICON BUTTON |============================ //
export const ICON_BUTTON =
  'text-4xl text-stone-200 duration-300 hover:cursor-pointer hover:text-teal-200';
