'use client';

import { useMemo, useState } from 'react';
import CaseVideoModal from '@/components/landing/CaseVideoModal';

function getYouTubeVideoId(url) {
  const value = (url || '').trim();

  if (value.includes('youtu.be/')) {
    return value.split('youtu.be/')[1]?.split('?')[0] || '';
  }

  if (value.includes('watch?v=')) {
    return value.split('watch?v=')[1]?.split('&')[0] || '';
  }

  if (value.includes('/embed/')) {
    return value.split('/embed/')[1]?.split('?')[0] || '';
  }

  return '';
}

export default function CaseStudiesShowcase({ caseStudies }) {
  const [activeCaseKey, setActiveCaseKey] = useState('');

  const preparedCases = useMemo(
    () =>
      caseStudies.map((caseItem) => ({
        ...caseItem,
        videoId: getYouTubeVideoId(caseItem.videoUrl)
      })),
    [caseStudies]
  );

  const activeCase = preparedCases.find((item) => item.key === activeCaseKey);

  return (
    <>
      <div className="case-grid">
        {preparedCases.map((caseItem) => (
          <article
            key={caseItem.key}
            className={`case-card case-card-overlay case-card-${caseItem.key}`}
            onClick={() => setActiveCaseKey(caseItem.key)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveCaseKey(caseItem.key);
              }
            }}
            aria-label={`Watch ${caseItem.title} case video`}
          >
            <picture>
              <source srcSet={caseItem.image.avifSrc} type="image/avif" />
              <source srcSet={caseItem.image.webpSrc} type="image/webp" />
              <img
                src={caseItem.image.fallbackSrc}
                alt={caseItem.image.alt}
                width={caseItem.image.width}
                height={caseItem.image.height}
                className="case-image"
                loading="lazy"
              />
            </picture>
            <div className="case-overlay" />
            <div className="case-play-button" aria-hidden="true">
              <span className="case-play-triangle" />
            </div>
            <div className="case-content">
              <h3>{caseItem.title}</h3>
              <p>{caseItem.resultsLine}</p>
            </div>
          </article>
        ))}
      </div>

      <CaseVideoModal
        isOpen={Boolean(activeCase)}
        onClose={() => setActiveCaseKey('')}
        title={activeCase ? `${activeCase.title} case video` : ''}
        videoId={activeCase?.videoId || ''}
      />
    </>
  );
}
