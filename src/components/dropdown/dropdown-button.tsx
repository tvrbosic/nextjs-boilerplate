// TYPES
import { IDropdownButtonProps } from '@/components/dropdown/types';

// STYLES
import {
  DROPDOWN_BUTTON_COMMON,
  DROPDOWN_BUTTON_DISABLED,
  SIZES,
  VARIANTS,
} from '@/components/dropdown/styles';

export default function DropdownButton({
  children,
  disabled = false,
  size = 'md',
  variant = 'solid',
  fullWidth = false,
  onClick,
}: IDropdownButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${DROPDOWN_BUTTON_COMMON} ${SIZES[size]} ${VARIANTS[variant]} ${disabled ? DROPDOWN_BUTTON_DISABLED : ''} ${fullWidth ? 'w-full' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center space-x-1">
        {children}

        <svg
          className="ms-3 h-2.5 w-2.5"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </div>
    </button>
  );
}
