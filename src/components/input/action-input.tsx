// TYPES
import { IActionInputProps } from '@/components/input/types';

// STYLES
import {
  ACTION_INPUT,
  ACTION_INPUT_BUTTON,
  INPUT_LABEL,
  LABEL_SPAN_ERROR,
} from '@/components/input/styles';

export default function ActionInput({
  actionButtonLabel,
  onClick,
  name,
  inputType = 'text',
  inputLabel,
  placeholder,
  value,
  defaultValue,
  error,
  onChange,
}: IActionInputProps) {
  return (
    <div className="flex">
      {inputLabel && (
        <label className={INPUT_LABEL}>
          {inputLabel}{' '}
          {error && <span className={LABEL_SPAN_ERROR}>{error}</span>}
        </label>
      )}

      <input
        name={name}
        type={inputType}
        className={`${ACTION_INPUT} ${error ?? 'border-red-400'}`}
        placeholder={placeholder || undefined}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />

      <button className={`${ACTION_INPUT_BUTTON}`} onClick={onClick}>
        {actionButtonLabel}
      </button>
    </div>
  );
}
