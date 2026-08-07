import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TopLoader from '@/components/shared/TopLoader';
import SmoothScroll from '@/components/shared/SmoothScroll';
import GoogleAnalytics from '@/components/shared/GoogleAnalytics';
import client from '@/tina/__generated__/client';
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
  icons: {
    icon: '/favicon.jpg',
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pageResult = await client.queries.sitePage(
    { relativePath: 'home.json' },
    { fetchOptions: { next: { revalidate: 300 } } }
  );
  const googleAnalyticsId = pageResult.data.sitePage.googleAnalyticsId ?? undefined;

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <GoogleAnalytics measurementId={googleAnalyticsId} />
        <SmoothScroll />
        <TopLoader />
        {children}
      </body>
    </html>
  );
}
