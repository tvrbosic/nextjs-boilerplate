export interface IActionInputProps {
  inputLabel?: string | undefined;
  actionButtonLabel: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
