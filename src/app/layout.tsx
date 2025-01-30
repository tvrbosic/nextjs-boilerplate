import type { Metadata } from 'next';

// These styles apply to every route in the application
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Next.js boilerplate',
  description: 'Next.js boilerplate starter project',
};

import { Aldrich } from 'next/font/google';

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
      <body>{children}</body>
    </html>
  );
}
