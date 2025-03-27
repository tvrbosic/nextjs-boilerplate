// TYPES
import { TComponentSize } from '@/types/theme';
import {
  TDropdonwButtonVariant,
  TMenuAlignment,
} from '@/components/dropdown/types';

export const DROPDOWN = `relative inline-block`;

export const DROPDOWN_BUTTON_COMMON = `me-2 mb-2 cursor-pointer rounded-lg focus:outline-none`;

export const DROPDOWN_BUTTON_DISABLED = `cursor-not-allowed opacity-50`;

export const ALIGNMENTS: Record<TMenuAlignment, string> = {
  left: 'left-0',
  right: 'right-0',
};

export const SIZES: Record<TComponentSize, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-lg',
};

export const VARIANTS: Record<TDropdonwButtonVariant, string> = {
  solid: `duration-300 bg-teal-600 text-stone-100 hover:bg-teal-500 hover:text-stone-200
    dark:bg-teal-500 dark:text-stone-100 dark:hover:bg-teal-600`,
  outline: `border border-teal-700 text-teal-700 duration-300 hover:border-teal-500 hover:text-teal-500 hover:bg-teal-500/10
    dark:border-stone-100 dark:text-stone-100 dark:hover:border-teal-500 dark:hover:bg-transparent`,
};

export const DROPDOWN_MENU = `bg-tertiary absolute z-10 mt-1 min-w-[200px] rounded-sm py-1 text-teal-100 shadow-lg`;

export const DROPDOWN_MENU_ITEM = `hover:text-tertiary flex w-full items-center px-4 py-2 transition-all duration-300 hover:cursor-pointer hover:bg-teal-200/80`;
