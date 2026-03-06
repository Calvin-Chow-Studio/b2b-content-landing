import { Public_Sans } from 'next/font/google';
import TrackingScripts from '@/components/analytics/TrackingScripts';
import './globals.css';

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-public-sans'
});

export const metadata = {
  metadataBase: new URL('https://go.chowdermedia.com'),
  title: 'B2B Content Production Singapore | Chowder Media',
  description:
    'B2B content production in Singapore that drives pipeline. Strategy, production, and activation for growth-focused teams.',
  openGraph: {
    title: 'B2B Content Production Singapore | Chowder Media',
    description:
      'B2B content production in Singapore that drives pipeline. Strategy, production, and activation for growth-focused teams.',
    type: 'website'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${publicSans.className} ${publicSans.variable}`}>
        <TrackingScripts />
        {children}
      </body>
    </html>
  );
}
