'use client';
// LIB
import { createContext, useState } from 'react';

// TYPES
import { IChildrenProps } from '@/types/global';
import { IThemeContext, TThemeVariant } from '@/context/theme/types';

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider = ({ children }: IChildrenProps) => {
  const [theme, setTheme] = useState<TThemeVariant>('dark');

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
