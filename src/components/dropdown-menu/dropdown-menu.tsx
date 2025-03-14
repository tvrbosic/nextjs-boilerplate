'use client';
// LIB
import { useEffect, useRef, useState } from 'react';

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
  children,
  menuAlignment = 'left',
}: IDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown container

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close the dropdown when a click outside is detected
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Add the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {activateElement}
      </div>

      {isOpen && (
        <div
          className={`${styles.dropdown_menu} ${ALIGNMENT_CLASSES[menuAlignment]}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
