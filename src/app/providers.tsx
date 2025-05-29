'use client';

// APP
import { ThemeProvider } from '@/context/theme/theme-context';
import { ToastProvider } from '@/context/toast-message/toast-context';
import { AuthProvider } from '@/context/auth/auth-context';
import { GlobalLoaderProvider } from '@/context/global-loader/global-loader-context';

// TYPES
import { IChildrenProps } from '@/types/global';

export default function Providers({ children }: IChildrenProps) {
  return (
    <ThemeProvider>
      <GlobalLoaderProvider>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </GlobalLoaderProvider>
    </ThemeProvider>
  );
}
