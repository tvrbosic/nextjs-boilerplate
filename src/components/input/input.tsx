import { IInputProps } from '@/components/input/types';

export default function ActionInput({
  inputLabel,
  inputType = 'text',
  placeholder,
}: IInputProps) {
  return (
    <div className="flex flex-col space-y-1">
      {inputLabel && (
        <label className="block mb-1 text-sm font-medium text-stone-200 dark:text-stone-200">
          {inputLabel}
        </label>
      )}

      <input
        type={inputType}
        className="block w-full p-2.5 text-sm rounded-lg     bg-purple-200 border-purple-900 placeholder-purple-900 text-purple-900 focus:ring-purple-800 focus:border-purple-800     dark:bg-purple-200 dark:border-purple-900 dark:placeholder-purple-900 dark:text-purple-900 dark:focus:ring-purple-800 dark:focus:border-purple-800"
        placeholder={placeholder || undefined}
        required
      />
    </div>
  );
}
