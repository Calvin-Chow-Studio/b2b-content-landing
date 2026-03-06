'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { buildTrackingQuery } from '@/lib/tracking';
import { trackLeadFormSubmit } from '@/lib/analytics';

const HUBSPOT_SCRIPT_SRC = 'https://js-na2.hsforms.net/forms/embed/43695545.js';
const HUBSPOT_PORTAL_ID = '43695545';
const HUBSPOT_FORM_ID = 'f6fbe3cf-437d-4323-b685-db21fa7c6569';
const HUBSPOT_REGION = 'na2';

export default function HubSpotFormPlaceholder({ trackingParams }) {
  const router = useRouter();
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const handleMessage = (event) => {
      const payload = event?.data;
      if (!payload || typeof payload !== 'object') {
        return;
      }

      if (payload.type !== 'hsFormCallback' || payload.eventName !== 'onFormSubmitted') {
        return;
      }

      if (payload.id && payload.id !== HUBSPOT_FORM_ID) {
        return;
      }

      trackLeadFormSubmit();
      const query = buildTrackingQuery(trackingParams);
      const destination = query ? `/thank-you-b2b-content?${query}` : '/thank-you-b2b-content';
      router.push(destination);
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [router, trackingParams]);

  return (
    <div className="hubspot-wrap" id="lead-form">
      <Script
        id="hubspot-form-embed"
        src={HUBSPOT_SCRIPT_SRC}
        strategy="afterInteractive"
        onError={() => setLoadError(true)}
      />
      <div
        className="hs-form-frame"
        data-region={HUBSPOT_REGION}
        data-form-id={HUBSPOT_FORM_ID}
        data-portal-id={HUBSPOT_PORTAL_ID}
      />
      {loadError ? (
        <p className="hubspot-note">
          The form failed to load. Refresh the page and try again.
        </p>
      ) : null}
    </div>
  );
}
