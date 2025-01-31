interface IButtonProps {
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline';
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown;
}

const variantClasses = {
  // 'bg-blue-700 text-gray-100 hover:bg-blue-800 focus:ring-blue-300
  //  dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-700 duration-300',
  // dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-700 duration-300
  solid:
    'text-stone-100 bg-teal-500 hover:bg-teal-600 focus:ring-teal-700     dark:text-stone-100 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-700 duration-300',
  outline:
    'border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-gray-100 focus:ring-teal-300     dark:border-teal-500 dark:text-teal-500 dark:hover:bg-teal-500 dark:hover:text-gray-100 dark:focus:ring-teal-700 duration-300',
};

export default function Button({
  disabled = false,
  size = 'md',
  variant = 'solid',
  children,
  onClick,
}: IButtonProps) {
  const sizeClasses = {
    sm: 'text-xs px-3 py-1',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-lg px-7 py-3',
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={`font-medium rounded-lg focus:ring-4 focus:outline-none me-2 mb-2  ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
