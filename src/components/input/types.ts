import { HTMLInputTypeAttribute } from 'react';

export type TLableStyle = 'default' | 'inverse' | 'light' | 'dark';

export interface IInputProps {
  name?: string;
  inputType?: HTMLInputTypeAttribute;
  inputLabel?: string | undefined;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  error?: string;
  labelStyle?: TLableStyle;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IActionInputProps {
  actionButtonLabel: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  name?: string;
  inputType?: HTMLInputTypeAttribute;
  inputLabel?: string | undefined;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  error?: string;
  labelStyle?: TLableStyle;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
