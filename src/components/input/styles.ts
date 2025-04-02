import { TLableStyle } from '@/components/input/types';

// ============================| COMMON |============================ //
export const INPUT_LABEL: Record<TLableStyle, string> = {
  default: `mb-1 block text-sm text-main`,
  inverse: `mb-1 block text-sm text-main-inverse`,
  light: `mb-1 block text-sm text-stone-100`,
  dark: `mb-1 block text-sm text-teal-800`,
};

export const LABEL_SPAN_ERROR = `ml-1 text-red-400 italic`;

// ============================| INPUT |============================ //
export const INPUT = `block w-full rounded-lg border-2 p-2.5 text-sm border-transparent focus:outline-none 
bg-blue-200 text-teal-900 placeholder-teal-900/50 focus:border-teal-500/50
dark:bg-purple-200 dark:text-purple-900 dark:placeholder-purple-900/50 dark:focus:border-purple-800/50`;

// ============================| ACTION INPUT |============================ //
export const ACTION_INPUT = `block w-full rounded-s-lg border-2 p-2.5 text-sm border-transparent focus:outline-none
bg-blue-200 text-teal-900 placeholder-teal-900/50 focus:border-teal-500/50
dark:bg-purple-200 dark:text-purple-900 dark:placeholder-purple-900/50 dark:focus:border-purple-800/50`;

export const ACTION_INPUT_BUTTON = `rounded-e-lg p-2.5 duration-300 hover:cursor-pointer
bg-teal-600 text-stone-100 hover:bg-teal-500 hover:text-stone-200 focus:ring-teal-500/40
dark:bg-teal-500 dark:text-stone-100 dark:hover:bg-teal-600`;
