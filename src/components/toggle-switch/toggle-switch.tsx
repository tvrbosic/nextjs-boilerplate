// TYPES
import { ToggleSwitchProps } from '@/components/toggle-switch/types';

// STYLES
import styles from '@/components/toggle-switch/styles.module.css';

export default function ToggleSwitch({
  checked,
  label,
  onChange,
}: ToggleSwitchProps) {
  return (
    <label className={styles.toggle_label_container}>
      <input
        type="checkbox"
        className={styles.toggle_input_hidden}
        checked={checked}
        onChange={onChange}
      />

      <span className={styles.toggle_span_track} />

      {label && <span className={styles.toggle_span_text}>{label}</span>}
    </label>
  );
}
