export type TThemeVariant = 'dark' | 'light';

export interface IThemeContext {
  theme: TThemeVariant;
  toggleTheme: () => void;
}
