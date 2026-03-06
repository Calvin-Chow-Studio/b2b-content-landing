'use client';

function sendEvent(name, params = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: name,
      ...params
    });
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

export function trackWorkWithUsClick(location) {
  sendEvent('work_with_us_click', {
    event_category: 'engagement',
    event_label: location
  });
}

export function trackLeadFormSubmit() {
  sendEvent('generate_lead', {
    event_category: 'lead',
    event_label: 'hubspot_placeholder_submit'
  });

  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (conversionLabel) {
    sendEvent('conversion', {
      send_to: conversionLabel
    });
  }
}
