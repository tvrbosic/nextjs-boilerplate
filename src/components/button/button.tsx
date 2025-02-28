import { IButtonProps } from '@/components/button/types';

const variantClasses = {
  solid:
    'text-stone-100 bg-teal-500 hover:bg-teal-600 focus:ring-teal-500/40     dark:text-stone-100 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-500/40 duration-300',
  outline:
    'border border-stone-100 text-stone-100 hover:border-teal-200 hover:text-teal-200 focus:ring-teal-300/40     dark:border-stone-100 dark:text-stone-100 dark:hover:bg-teal-200/5    dark:hover:border-teal-200 dark:hover:text-teal-200 dark:focus:ring-teal-300/40 duration-300',
};

export default function Button({
  disabled = false,
  size = 'md',
  variant = 'solid',
  children,
  onClick,
  fill = false,
}: IButtonProps) {
  const sizeClasses = {
    sm: 'text-xs px-3 py-1',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-lg px-7 py-3',
  };

  const fillClass = fill ? 'w-full' : '';

  return (
    <button
      type="button"
      disabled={disabled}
      className={`font-medium rounded-lg focus:ring-4 focus:outline-none me-2 mb-2  ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'} ${fillClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
