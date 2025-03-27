import { TComponentSize } from '@/types/theme';

export type TSpinnerVariant = 'light' | 'dark';

export interface ISpinnerProps {
  size?: TComponentSize;
  variant?: TSpinnerVariant;
}
