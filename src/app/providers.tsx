'use client';

// APP
import { ThemeProvider } from '@/context/theme/theme-context';
import { AuthProvider } from '@/context/auth/auth-context';

// TYPES
import { IChildrenProps } from '@/types/global';

export default function Providers({ children }: IChildrenProps) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
