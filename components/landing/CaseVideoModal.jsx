'use client';

import { useEffect } from 'react';

export default function CaseVideoModal({ isOpen, onClose, title, videoId }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !videoId) {
    return null;
  }

  return (
    <div className="video-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="video-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="video-modal-header">
          <h3>{title}</h3>
          <button type="button" className="video-modal-close" onClick={onClose} aria-label="Close video">
            ×
          </button>
        </div>
        <div className="video-modal-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
