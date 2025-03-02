export interface ToggleSwitchProps {
  checked: boolean;
  label?: React.ReactNode | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
