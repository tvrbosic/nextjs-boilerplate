// TYPES
import { TComponentSize } from '@/types/theme';
import { IButtonProps, TButtonVariant } from '@/components/button/types';

// COMPONENTS
import Spinner from '@/components/spinner/spinner';

const VARIANT_CLASSES: Record<TButtonVariant, string> = {
  solid:
    'text-stone-100 bg-teal-500 hover:bg-teal-600 focus:ring-teal-500/40     dark:text-stone-100 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-500/40 duration-300',
  outline:
    'border border-stone-100 text-stone-100 hover:border-teal-200 hover:text-teal-200 focus:ring-teal-300/40     dark:border-stone-100 dark:text-stone-100 dark:hover:bg-teal-200/5    dark:hover:border-teal-200 dark:hover:text-teal-200 dark:focus:ring-teal-300/40 duration-300',
};

const SIZE_CLASSES: Record<TComponentSize, string> = {
  sm: 'text-xs px-3 py-1',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-lg px-7 py-3',
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
  const fillClass = fullWidth ? 'w-full' : '';

  const applyDisabledClasses =
    disabled || isLoading
      ? 'opacity-50 cursor-not-allowed'
      : 'hover:cursor-pointer';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`font-medium rounded-lg focus:ring-4 focus:outline-none me-2 mb-2  ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${applyDisabledClasses} ${fillClass}`}
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
