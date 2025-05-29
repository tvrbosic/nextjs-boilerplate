// LIBRARY
import { useState } from 'react';

// TYPES
import { IToggleSwitchProps } from '@/components/toggle-switch/types';

// STYLES
import {
  TOGGLE_LABEL_CONTAINER,
  TOGGLE_INPUT_HIDDEN,
  TOGGLE_SPAN_TRACK,
  TOGGLE_SPAN_TRACK_DEFAULT,
  TOGGLE_SPAN_TRACK_CHECKED,
  TOGGLE_HANDLE,
  TOGGLE_HANDLE_CHECKED,
} from '@/components/toggle-switch/styles';

export default function ToggleSwitch({ initialCheckedValue, onChange }: IToggleSwitchProps) {
  const [isChecked, setIsChecked] = useState<boolean>(initialCheckedValue);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked((prev) => !prev);
    onChange(e);
  };

  const trackClasses = `${TOGGLE_SPAN_TRACK} ${isChecked ? TOGGLE_SPAN_TRACK_CHECKED : TOGGLE_SPAN_TRACK_DEFAULT}`;

  const handleClasses = `${TOGGLE_HANDLE} ${isChecked ? TOGGLE_HANDLE_CHECKED : ''}`;

  return (
    <label className={TOGGLE_LABEL_CONTAINER}>
      <input type="checkbox" className={TOGGLE_INPUT_HIDDEN} checked={isChecked} onChange={handleToggle} />

      <span className={trackClasses}>
        <span className={handleClasses} />
      </span>
    </label>
  );
}
