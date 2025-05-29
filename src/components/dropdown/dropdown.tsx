'use client';
// LIBRARY
import { useEffect, useRef, useState } from 'react';

// TYPES
import { IDropdownProps } from '@/components/dropdown/types';

// STYLES
import { ALIGNMENTS, DROPDOWN, DROPDOWN_MENU } from '@/components/dropdown/styles';

export default function DropdownMenu({ children, activateElement, menuAlignment = 'left' }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown container

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close the dropdown when a click outside is detected
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    <div className={DROPDOWN} ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {activateElement}
      </div>

      {isOpen && <div className={`${DROPDOWN_MENU} ${ALIGNMENTS[menuAlignment]}`}>{children}</div>}
    </div>
  );
}
