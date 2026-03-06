'use client';

import { useMemo, useState } from 'react';

function getLogoSlug(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function LogoItem({ logo }) {
  const [isBroken, setBroken] = useState(false);
  const logoSlug = getLogoSlug(logo.name);
  const hasOptimizedSources = Boolean(logo.avifSrc || logo.webpSrc);
  const image = (
    <img
      src={logo.fallbackSrc}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      className={`logo-image logo-image-${logoSlug}`}
      loading="lazy"
      onError={() => setBroken(true)}
    />
  );

  return (
    <div className="logo-pill">
      {!isBroken ? (
        hasOptimizedSources ? (
          <picture>
            {logo.avifSrc ? <source srcSet={logo.avifSrc} type="image/avif" /> : null}
            {logo.webpSrc ? <source srcSet={logo.webpSrc} type="image/webp" /> : null}
            {image}
          </picture>
        ) : (
          image
        )
      ) : null}
      <span className={isBroken ? 'logo-name' : 'sr-only'}>{logo.name}</span>
    </div>
  );
}

export default function LogoCarousel({ logos, speed = 30 }) {
  const trackItems = useMemo(() => [...logos, ...logos], [logos]);

  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <div className="logo-carousel" style={{ '--logo-speed': `${speed}s` }}>
      <div className="logo-track">
        {trackItems.map((logo, index) => (
          <LogoItem key={`${logo.name}-${index}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}
