// TYPES
import { IButtonProps } from '@/components/button/types';

// COMPONENTS
import Spinner from '@/components/spinner/spinner';

// STYLES
import { COMMON, VARIANTS, SIZES, DISABLED } from '@/components/button/styles';

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
      className={`${COMMON} ${SIZES[size]} ${VARIANTS[variant]} ${isDisabled ? DISABLED : ''} ${fullWidth ? 'w-full' : ''}`}
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
