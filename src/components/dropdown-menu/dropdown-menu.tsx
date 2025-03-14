'use client';
// LIB
import { useState } from 'react';

// TYPES
import {
  IDropdownMenuProps,
  TMenuAlignment,
} from '@/components/dropdown-menu/types';

// STYLES
import styles from '@/components/dropdown-menu/styles.module.css';

const ALIGNMENT_CLASSES: Record<TMenuAlignment, string> = {
  left: 'left-0',
  right: 'right-0',
};

export default function DropdownMenu({
  activateElement,
  menuAlignment = 'left',
}: IDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.dropdown}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {activateElement}
      </div>
      {isOpen && (
        <div
          className={`${styles.dropdown_content} ${ALIGNMENT_CLASSES[menuAlignment]}`}
        >
          <p>Hello World!</p>
        </div>
      )}
    </div>
  );
}
