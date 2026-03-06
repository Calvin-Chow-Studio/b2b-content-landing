'use client';

import { useState } from 'react';

export default function HeroVideoFacade({
  videoId,
  title,
  posterSrc
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoId) {
    return null;
  }

  return (
    <div className="video-frame hero-video-frame">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="hero-video-launch"
          onClick={() => setIsPlaying(true)}
          aria-label={`Play ${title}`}
        >
          <img
            src={posterSrc}
            alt=""
            className="hero-video-poster"
            loading="lazy"
          />
          <span className="hero-video-overlay" aria-hidden="true" />
          <span className="case-play-button hero-play-button" aria-hidden="true">
            <span className="case-play-triangle" />
          </span>
        </button>
      )}
    </div>
  );
}
