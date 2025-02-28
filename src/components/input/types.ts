import { HTMLInputTypeAttribute } from 'react';

export interface IInputProps {
  inputLabel?: string | undefined;
  inputType?: HTMLInputTypeAttribute;
  placeholder?: string;
}

export interface IActionInputProps {
  actionButtonLabel: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  inputLabel?: string | undefined;
  inputType?: HTMLInputTypeAttribute;
  placeholder?: string;
}
