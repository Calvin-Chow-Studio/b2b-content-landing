import BrandLogo from '@/components/landing/BrandLogo';
import Section from '@/components/landing/Section';
import { landingAssets } from '@/lib/landingAssets';
import ThankYouRedirect from '@/app/thank-you/ThankYouRedirect';

const YOUTUBE_URL = 'https://www.youtube.com/@chowdermedia';

export const metadata = {
  title: 'Thank You | Chowder Media',
  description: 'Thanks for reaching out to Chowder Media. Calvin will review your enquiry personally and reply soon.',
  alternates: {
    canonical: '/thank-you-b2b-content'
  }
};

export default function ThankYouB2BContentPage() {
  return (
    <>
      <header className="site-header thank-you-header">
        <div className="site-header-inner thank-you-header-inner">
          <a href="https://chowdermedia.com" className="brand" aria-label="Chowder Media homepage">
            <BrandLogo logo={landingAssets.brandLogo} />
          </a>
        </div>
      </header>

      <main className="thank-you-layout">
        <Section className="hero-section thank-you-hero-section">
          <div className="hero-stack thank-you-stack">
            <h1>Thank you. Your enquiry is in.</h1>
            <p className="hero-subhead thank-you-subhead">
              Founder-led B2B content and demand execution for teams that care about commercial outcomes.
            </p>

            <div className="offer-panel thank-you-panel" role="status" aria-live="polite">
              <h2>Calvin will review your enquiry personally and get back to you soon.</h2>
              <p>
                If your project looks like a strong fit, the next step will be a follow-up by email
                to discuss goals, timelines, and what makes sense commercially.
              </p>
            </div>

            <div className="thank-you-actions">
              <a className="cta-button thank-you-cta" href={YOUTUBE_URL}>
                <span>Watch our YouTube</span>
                <span className="cta-arrow-icon" aria-hidden="true" />
              </a>
              <ThankYouRedirect href={YOUTUBE_URL} delayMs={20000} />
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
