import { IInputProps } from '@/components/input/types';

export default function ActionInput({
  required = false,
  name,
  inputType = 'text',
  inputLabel,
  placeholder,
  value,
  error,
  onChange,
}: IInputProps) {
  return (
    <div className="flex flex-col space-y-1">
      {inputLabel && (
        <label className="block mb-1 text-sm font-medium text-stone-200 dark:text-stone-200">
          {inputLabel}{' '}
          {error && <span className="text-red-400 italic ml-1">{error}</span>}
        </label>
      )}

      <input
        required={required}
        name={name}
        type={inputType}
        className={`block w-full p-2.5 text-sm rounded-lg border-2 focus:outline-none bg-purple-200 placeholder-purple-900 text-purple-900 focus:border-teal-500/50 dark:bg-purple-200 dark:placeholder-purple-900 dark:text-purple-900  dark:focus:border-teal-500/50 ${
          error ? 'border-red-400' : 'border-transparent'
        }`}
        placeholder={placeholder || undefined}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
