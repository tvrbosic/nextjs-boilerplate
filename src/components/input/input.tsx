// TYPES
import { IInputProps } from '@/components/input/types';

// STYLES
import styles from '@/components/input/styles.module.css';

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
        <label className={`${styles.input_label}`}>
          {inputLabel}{' '}
          {error && <span className={styles.label_span_error}>{error}</span>}
        </label>
      )}

      <input
        required={required}
        name={name}
        type={inputType}
        className={`${styles.input_common} ${styles.input_light}  ${error ?? 'border-red-400'}`}
        placeholder={placeholder || undefined}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
