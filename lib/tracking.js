const TRACKING_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'msclkid',
  'ttclid'
];

export function extractTrackingParams(searchParams = {}) {
  return TRACKING_KEYS.reduce((acc, key) => {
    const value = searchParams[key];
    if (typeof value === 'string' && value.trim()) {
      acc[key] = value.trim();
    }
    if (Array.isArray(value) && value[0]) {
      acc[key] = value[0].trim();
    }
    return acc;
  }, {});
}

export function buildTrackingQuery(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.set(key, value);
    }
  });
  return query.toString();
}
