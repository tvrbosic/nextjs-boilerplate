export type TSpinnerVariant = 'light' | 'dark';

export type TSpinnerSize = 'sm' | 'md' | 'lg';

export interface ISpinnerProps {
  size?: TSpinnerSize;
  variant?: TSpinnerVariant;
}
