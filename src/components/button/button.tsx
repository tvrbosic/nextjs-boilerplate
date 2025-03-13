// TYPES
import { TComponentSize } from '@/types/theme';
import { IButtonProps, TButtonVariant } from '@/components/button/types';

// COMPONENTS
import Spinner from '@/components/spinner/spinner';

// STYLES
import styles from '@/components/button/styles.module.css';

const VARIANT_CLASSES: Record<TButtonVariant, string> = {
  solid: styles.button_solid,
  outline: styles.button_outline,
};

const SIZE_CLASSES: Record<TComponentSize, string> = {
  sm: styles.button_small,
  md: styles.button_medium,
  lg: styles.button_large,
};

export default function Button({
  children,
  disabled = false,
  size = 'md',
  variant = 'solid',
  type = 'button',
  fullWidth = false,
  isLoading = false,
  onClick,
}: IButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${styles.button_common} ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${isDisabled ?? styles.button_disabled} ${fullWidth ?? 'w-full'}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center space-x-1">
        {children}
        {isLoading && (
          <div className="ml-2">
            <Spinner />
          </div>
        )}
      </div>
    </button>
  );
}
