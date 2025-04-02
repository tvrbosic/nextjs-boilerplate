// TYPES
import { TComponentSize } from '@/types/theme';
import { TEditIconStyle } from '@/components/avatar-image/types';

export const SIZES: Partial<Record<TComponentSize, string>> = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
  '2xl': 'h-36 w-36',
  '3xl': 'h-64 w-64',
};

export const EDIT_BUTTON: Record<TEditIconStyle, string> = {
  default: `text-4xl duration-300 absolute right-8 hover:cursor-pointer bottom-1 border-1 rounded-full p-2 
  border-stone-600/50 text-stone-200 bg-teal-500 hover:bg-teal-600 
  dark:border-stone-300/80 dark:bg-teal-600 dark:hover:bg-teal-500`,
  // NOTE: Extend TEditIconStyle and add styles here (light, dark, inverse, etc.)
};
