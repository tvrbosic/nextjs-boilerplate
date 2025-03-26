'use client';
// LIB
import { use } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

// APP
import { ThemeContext } from '@/context/theme/theme-context';

// COMPONENTS
import ToggleSwitch from '@/components/toggle-switch/toggle-switch';

export default function ThemeToggle() {
  const { theme, toggleTheme } = use(ThemeContext);

  return (
    <div className="flex items-center justify-center space-x-2">
      <span className="text-xl text-yellow-300">
        <FiSun />
      </span>

      <ToggleSwitch checked={theme === 'dark'} onChange={toggleTheme} />

      <span className="text-xl text-gray-400">
        <FiMoon />
      </span>
    </div>
  );
}
