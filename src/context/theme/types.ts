export type TThemeVariations = 'dark' | 'light';

export interface IThemeContext {
  theme: TThemeVariations;
  toggleTheme: () => void;
}
