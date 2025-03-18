// TYPES
import { TComponentSize } from '@/types/theme';
import {
  IDropdownButtonProps,
  TDropdonwButtonVariant,
} from '@/components/dropdown/types';

// STYLES
import styles from '@/components/dropdown/styles.module.css';

const VARIANT_CLASSES: Record<TDropdonwButtonVariant, string> = {
  solid: styles.dropdown_button_solid,
  outline: styles.dropdown_button_outline,
};

const SIZE_CLASSES: Record<TComponentSize, string> = {
  sm: styles.dropdown_button_small,
  md: styles.dropdown_button_medium,
  lg: styles.dropdown_button_large,
};

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
      className={`${styles.dropdown_button_common} ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${disabled ?? styles.dropdown_button_disabled} ${fullWidth ?? 'w-full'}`}
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
