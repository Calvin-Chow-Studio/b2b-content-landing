'use client';

import { useEffect, useState } from 'react';

export default function ThankYouRedirect({ href, delayMs = 5000 }) {
  const totalSeconds = Math.ceil(delayMs / 1000);
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);

  useEffect(() => {
    let timeoutId;
    let intervalId;

    const startRedirectTimer = () => {
      setSecondsRemaining(totalSeconds);

      const endTime = Date.now() + delayMs;

      intervalId = window.setInterval(() => {
        const nextSeconds = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
        setSecondsRemaining(nextSeconds);
      }, 250);

      timeoutId = window.setTimeout(() => {
        window.location.assign(href);
      }, delayMs);
    };

    if (document.readyState === 'complete') {
      startRedirectTimer();
    } else {
      window.addEventListener('load', startRedirectTimer, { once: true });
    }

    return () => {
      window.removeEventListener('load', startRedirectTimer);

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [delayMs, href, totalSeconds]);

  return <p className="thank-you-redirect">You’ll be redirected in {secondsRemaining} seconds.</p>;
}
