import { IActionInputProps } from '@/components/input/types';

export default function ActionInput({
  actionButtonLabel,
  onClick,
  required = false,
  name,
  inputType = 'text',
  inputLabel,
  placeholder,
  value,
  onChange,
}: IActionInputProps) {
  return (
    <div className="flex">
      {inputLabel && (
        <label className="block mb-1 text-sm font-medium text-stone-800 dark:text-stone-200">
          {inputLabel}
        </label>
      )}

      <input
        required={required}
        name={name}
        type={inputType}
        className="block w-full p-2.5 text-sm rounded-s-lg border-2 border-transparent focus:outline-none     bg-purple-200 placeholder-purple-900 text-purple-900  focus:border-teal-500/50     dark:bg-purple-200 dark:placeholder-purple-900 dark:text-purple-900  dark:focus:border-teal-500/50"
        placeholder={placeholder || undefined}
        value={value}
        onChange={onChange}
      />

      <button
        className="rounded-e-lg p-2.5 hover:cursor-pointer border-l-[1px] duration-300 border-purple-800     text-stone-100 bg-teal-500 hover:bg-teal-600 focus:ring-teal-700     dark:text-stone-100 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-700"
        onClick={onClick}
      >
        {actionButtonLabel}
      </button>
    </div>
  );
}
