'use client';
// LIBRARY
import { createContext, useState } from 'react';

// TYPES
import { IChildrenProps } from '@/types/global';
import { IThemeContext, TThemeVariations } from '@/context/theme/types';

const ThemeContext = createContext<IThemeContext | null>(null);

const ThemeProvider = ({ children }: IChildrenProps) => {
  const [theme, setTheme] = useState<TThemeVariations>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
