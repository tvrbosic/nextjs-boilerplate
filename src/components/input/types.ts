import { HTMLInputTypeAttribute } from 'react';

export interface IInputProps {
  required?: boolean;
  name?: string;
  inputType?: HTMLInputTypeAttribute;
  inputLabel?: string | undefined;
  placeholder?: string;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IActionInputProps {
  actionButtonLabel: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  required?: boolean;
  name?: string;
  inputLabel?: string | undefined;
  inputType?: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
