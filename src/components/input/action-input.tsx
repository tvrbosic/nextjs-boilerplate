// TYPES
import { IActionInputProps } from '@/components/input/types';

// STYLES
import styles from '@/components/input/styles.module.css';

export default function ActionInput({
  actionButtonLabel,
  onClick,
  required = false,
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
        <label className={styles.input_label}>
          {inputLabel}{' '}
          {error && <span className={styles.label_span_error}>{error}</span>}
        </label>
      )}

      <input
        required={required}
        name={name}
        type={inputType}
        className={`${styles.action_input} ${error ?? 'border-red-400'}`}
        placeholder={placeholder || undefined}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />

      <button className={`${styles.action_input_button}`} onClick={onClick}>
        {actionButtonLabel}
      </button>
    </div>
  );
}
