'use client';
// LIB
import { createContext, useEffect, useState } from 'react';

// TYPES
import { IChildrenProps } from '@/types/global';
import { IThemeContext, TThemeVariant } from '@/context/theme/types';

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider = ({ children }: IChildrenProps) => {
  const [theme, setTheme] = useState<TThemeVariant>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
