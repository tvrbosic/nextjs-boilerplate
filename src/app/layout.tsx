// LIBRARY
import type { Metadata } from 'next';
import { Aldrich } from 'next/font/google';

// APP
import GlobalErrorBoundary from '@/components/global-error-boundary/global-error-boundary';
import Providers from '@/app/providers';

// TYPES
import { TThemeVariant } from '@/context/theme/types';

// STYLES
// These styles apply to every route in the application
import '@/styles/tailwind.css';

// EXTEND METADATA: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  title: 'Next.js boilerplate',
  description: 'Next.js boilerplate starter project',
};

const aldrich = Aldrich({
  weight: '400',
  subsets: ['latin'],
});

const defaultTheme = process.env.NEXT_PUBLIC_DEFAULT_THEME as TThemeVariant;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${aldrich.className} ${defaultTheme}`}>
      <body>
        <GlobalErrorBoundary>
          <Providers>{children}</Providers>
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}
