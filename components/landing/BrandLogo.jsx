'use client';

import { useState } from 'react';

export default function BrandLogo({ logo, className = '' }) {
  const [source, setSource] = useState(logo.src);

  const onError = () => {
    if (logo.fallbackSrc && source !== logo.fallbackSrc) {
      setSource(logo.fallbackSrc);
    }
  };

  return (
    <img
      className={`brand-logo ${className}`.trim()}
      src={source}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      onError={onError}
    />
  );
}
