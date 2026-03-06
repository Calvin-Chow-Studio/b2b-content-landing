'use client';

import { trackWorkWithUsClick } from '@/lib/analytics';
import CtaArrowIcon from '@/components/landing/CtaArrowIcon';

export default function CtaScrollButton({
  className = '',
  targetId = 'lead-form',
  label = 'Work with us',
  location = 'unknown'
}) {
  const onClick = () => {
    trackWorkWithUsClick(location);

    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const firstInput = target.querySelector('input, textarea, select, button');
    if (firstInput && typeof firstInput.focus === 'function') {
      firstInput.focus({ preventScroll: true });
    }
  };

  return (
    <button type="button" className={`cta-button ${className}`.trim()} onClick={onClick}>
      <span>{label}</span>
      <CtaArrowIcon />
    </button>
  );
}
