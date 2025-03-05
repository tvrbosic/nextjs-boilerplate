export type TToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface IToastMessageProps {
  id: string;
  message: string;
  variant: TToastVariant;
  duration: number;
}

export interface IToastMessageContext {
  showToast: (
    message: string,
    variant?: TToastVariant,
    duration?: number
  ) => void;
}
