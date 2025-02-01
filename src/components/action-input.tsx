interface IActionInputProps {
  inputLabel?: string | undefined;
  actionButtonLabel: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

//  dark:text-stone-100 dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-700 duration-300',

export default function ActionInput({
  inputLabel,
  actionButtonLabel,
  onClick,
}: IActionInputProps) {
  return (
    <div className="flex">
      {inputLabel && (
        <label className="block mb-1 text-sm font-medium text-stone-800 dark:text-stone-200">
          {inputLabel}
        </label>
      )}

      <input
        type="email"
        className="block w-full p-2.5 text-sm rounded-s-lg     bg-purple-200 border-purple-900 placeholder-purple-900 text-purple-900 focus:ring-purple-800 focus:border-purple-800     dark:bg-purple-200 dark:border-purple-900 dark:placeholder-purple-900 dark:text-purple-900 dark:focus:ring-purple-800 dark:focus:border-purple-800"
        placeholder="john.doe@company.com"
        required
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
