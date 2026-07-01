import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TopLoader from '@/components/shared/TopLoader';
import SmoothScroll from '@/components/shared/SmoothScroll';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Serifs and Systems',
  description:
    'Brand strategy and websites with personality.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SmoothScroll />
        <TopLoader />
        {children}
      </body>
    </html>
  );
}
