import { HTMLInputTypeAttribute } from 'react';

export interface IInputProps {
  required?: boolean;
  name?: string;
  inputType?: HTMLInputTypeAttribute;
  inputLabel?: string | undefined;
  placeholder?: string;
  error?: string;
}

export interface IActionInputProps {
  actionButtonLabel: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  required?: boolean;
  name?: string;
  inputLabel?: string | undefined;
  inputType?: HTMLInputTypeAttribute;
  placeholder?: string;
}
