import LandingPage from '@/components/landing/LandingPage';
import { extractTrackingParams } from '@/lib/tracking';

export const metadata = {
  title: 'B2B Content Production Singapore | Chowder Media',
  description:
    'B2B content production in Singapore that drives pipeline. Strategy, production, and activation for growth-focused teams.',
  alternates: {
    canonical: '/b2b-content-production'
  },
  openGraph: {
    title: 'B2B Content Production Singapore | Chowder Media',
    description:
      'B2B content production in Singapore that drives pipeline. Strategy, production, and activation for growth-focused teams.',
    type: 'website',
    url: 'https://go.chowdermedia.com/b2b-content-production'
  }
};

export default function B2BContentProductionPage({ searchParams }) {
  const trackingParams = extractTrackingParams(searchParams);
  return <LandingPage trackingParams={trackingParams} />;
}
