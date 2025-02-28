// LIBRARY
import type { Metadata } from 'next';
import { Aldrich } from 'next/font/google';

// APP
import Providers from '@/app/providers';

// These styles apply to every route in the application
import '@/styles/global.css';

// EXTEND METADATA: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  title: 'Next.js boilerplate',
  description: 'Next.js boilerplate starter project',
};

const aldrich = Aldrich({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={aldrich.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
