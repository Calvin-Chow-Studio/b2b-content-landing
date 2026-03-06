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

  return (
    <div className="logo-pill">
      {!isBroken ? (
        <picture>
          <source srcSet={logo.avifSrc} type="image/avif" />
          <source srcSet={logo.webpSrc} type="image/webp" />
          <img
            src={logo.fallbackSrc}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className={`logo-image logo-image-${logoSlug}`}
            loading="lazy"
            onError={() => setBroken(true)}
          />
        </picture>
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
