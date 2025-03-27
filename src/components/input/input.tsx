// TYPES
import { IInputProps } from '@/components/input/types';

// STYLES
import {
  INPUT_LABEL,
  INPUT,
  LABEL_SPAN_ERROR,
} from '@/components/input/styles';

export default function ActionInput({
  name,
  inputType = 'text',
  inputLabel,
  placeholder,
  value,
  defaultValue,
  error,
  onChange,
}: IInputProps) {
  return (
    <div className="flex flex-col space-y-1">
      {inputLabel && (
        <label className={`${INPUT_LABEL}`}>
          {inputLabel}{' '}
          {error && <span className={LABEL_SPAN_ERROR}>{error}</span>}
        </label>
      )}

      <input
        name={name}
        type={inputType}
        className={`${INPUT} ${error ?? 'border-red-400'}`}
        placeholder={placeholder || undefined}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
}
