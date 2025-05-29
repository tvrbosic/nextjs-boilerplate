'use client';
// LIBRARY
import { createContext, useEffect, useState } from 'react';

// TYPES
import { IChildrenProps } from '@/types/global';
import { IThemeContext, TThemeVariant } from '@/context/theme/types';

const defaultTheme = process.env.NEXT_PUBLIC_DEFAULT_THEME as TThemeVariant;
const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider = ({ children }: IChildrenProps) => {
  const [theme, setTheme] = useState<TThemeVariant>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as TThemeVariant) || defaultTheme;
    }
    return defaultTheme;
  });
  const [isInitialized, setIsInitialized] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    if (theme) {
      setIsInitialized(true);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Render nothing until the theme is initialized
  if (!isInitialized) {
    return null;
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
