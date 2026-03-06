import { redirect } from 'next/navigation';
import { buildTrackingQuery, extractTrackingParams } from '@/lib/tracking';

export default function HomePage({ searchParams }) {
  const trackingParams = extractTrackingParams(searchParams);
  const query = buildTrackingQuery(trackingParams);
  redirect(query ? `/b2b-content-production?${query}` : '/b2b-content-production');
}
