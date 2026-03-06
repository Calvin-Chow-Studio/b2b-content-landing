import CtaScrollButton from '@/components/landing/CtaScrollButton';
import HubSpotFormPlaceholder from '@/components/landing/HubSpotFormPlaceholder';
import Section from '@/components/landing/Section';
import BrandLogo from '@/components/landing/BrandLogo';
import ComparisonTable from '@/components/landing/ComparisonTable';
import LogoCarousel from '@/components/landing/LogoCarousel';
import CaseStudiesShowcase from '@/components/landing/CaseStudiesShowcase';
import HeroVideoFacade from '@/components/landing/HeroVideoFacade';
import { comparisonRows, landingAssets } from '@/lib/landingAssets';

const metrics = [
  {
    stat: '4x',
    label: 'impression lift delivered for HitPay vs in-house baseline'
  },
  {
    stat: '$150M+',
    label: 'influenced in commercial outcomes across revenue and funding'
  },
  {
    stat: '600%',
    label: 'organic impression growth achieved for Moomoo podcast content'
  }
];

const pillars = [
  {
    title: 'Strategy',
    description:
      'We fuse buyer pain points and real content signals to shape ideas your audience actually wants, improving reach, relevance, and retention.'
  },
  {
    title: 'Production',
    description:
      'Produce premium B2B creative fast, from hero videos to short-form cutdowns, built to earn attention and reach the audiences that matter.'
  },
  {
    title: 'Activation',
    description:
      'Launch across paid and organic channels, including Google, YouTube, Meta, and LinkedIn, to drive the conversions your business actually needs.'
  }
];

const testimonials = [
  {
    name: 'Dan Tham',
    role: 'Production Manager, Fidelity International',
    quote: 'Calvin at Chowder Media is reliable, communicative and executes well.',
    logoSrc: '/optimized/clients/fidelity-symbol-1200x628-360.webp',
    logoAlt: 'Fidelity International logo'
  },
  {
    name: 'Illie Z.',
    role: 'Manager, London Business School',
    quote: 'Thank you Calvin at Chowder Media, everything from strategy to video production was great from start to finish.',
    logoSrc: '/optimized/clients/london-business-school-logo-svg-360.webp',
    logoAlt: 'London Business School logo'
  },
  {
    name: 'Jackie C.',
    role: 'Marketing, Green Monday Group',
    quote:
      'Chowder Media is very professional and easy to work with. They understand the requirements for the job perfectly right away. I would have no hesitation working with Chowder Media again should similar opportunities arise or recommend them to any of my contacts.',
    logoSrc: '/optimized/clients/green-monday-logo-300.webp',
    logoAlt: 'Green Monday Group logo'
  }
];

const contentTypes = [
  {
    icon: 'person',
    title: 'Customer Testimonial Content',
    description: 'Trust-building stories designed to support enterprise buying decisions.'
  },
  {
    icon: 'target',
    title: 'Industry Insight Content',
    description: 'Expert-led narratives that position your brand with authority.'
  },
  {
    icon: 'microphone',
    title: 'Podcast and Conversation Content',
    description: 'Long-form interviews repurposed into high-performing campaign assets.'
  },
  {
    icon: 'product',
    title: 'Product and Solution Content',
    description: 'Clear product storytelling that connects capability to commercial value.'
  },
  {
    icon: 'megaphone',
    title: 'Explainer Videos',
    description: 'Structured explainers that simplify complex B2B offerings and accelerate clarity.'
  },
  {
    icon: 'youtube',
    title: 'Social Distribution Content',
    description: 'Short-form edits built to amplify reach and convert attention into pipeline.'
  }
];

const faqs = [
  {
    q: 'What kinds of companies do you work with?',
    a: 'We work with B2B companies where trust, category education, and long buying cycles require content that does more than generate vanity engagement.'
  },
  {
    q: 'Do you only work with Singapore companies?',
    a: 'Singapore is core for us, but we also support regional and global teams targeting Singapore-based buyers.'
  },
  {
    q: 'What platforms can you run ads on?',
    a: 'Google, YouTube, Meta, and LinkedIn. We choose channel mix based on your ICP and buying-stage behavior.'
  },
  {
    q: 'Is ad spend included?',
    a: 'No. You fund media spend directly in your ad accounts, so costs stay transparent and fully under your control.'
  },
  {
    q: 'Can you work with our existing ad accounts?',
    a: 'Yes. We can operate inside your existing Google, YouTube, Meta, and LinkedIn accounts with the right access setup.'
  },
  {
    q: 'How quickly can you start?',
    a: 'After scope alignment, we move fast into planning and production so first campaign assets can launch quickly.'
  },
  {
    q: 'What happens after I submit the form?',
    a: 'Calvin reviews your brief directly and usually replies within 3 hours with clear next steps.'
  }
];

function ContentTypeIcon({ icon }) {
  if (icon === 'person') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3.3" />
        <path d="M5.5 19.5c1.3-3.1 3.7-4.8 6.5-4.8s5.2 1.7 6.5 4.8" />
      </svg>
    );
  }

  if (icon === 'target') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.2" />
        <circle cx="12" cy="12" r="4.6" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        <path d="M16.8 7.2 20 4" />
      </svg>
    );
  }

  if (icon === 'microphone') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8.8" y="3.6" width="6.4" height="10.8" rx="3.2" />
        <path d="M6.4 11.8a5.6 5.6 0 0 0 11.2 0" />
        <path d="M12 17.4v3.2" />
        <path d="M8.7 20.6h6.6" />
      </svg>
    );
  }

  if (icon === 'product') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.3 5.1h5.4" />
        <path d="M10 2.9h4" />
        <rect x="8.2" y="5.1" width="7.6" height="14.2" rx="2" />
        <path d="M10.6 8.2h2.8" />
      </svg>
    );
  }

  if (icon === 'megaphone') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 12.6V9.4l11.1-4.1v11.4L3.5 12.6Z" />
        <path d="m14.6 8.1 4.5-1.7v11.2l-4.5-1.7" />
        <path d="M6.8 12.1 8.5 18" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.3" y="6" width="17.4" height="12" rx="3" />
      <polygon points="10,9.4 10,14.6 14.6,12" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function LandingPage({ trackingParams }) {
  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <a href="https://chowdermedia.com" className="brand" aria-label="Chowder Media homepage">
            <BrandLogo logo={landingAssets.brandLogo} />
          </a>
          <CtaScrollButton className="header-cta" location="header" />
        </div>
      </header>

      <main>
        <Section className="hero-section" id="founder-video">
          <div className="hero-stack">
            <h1>B2B Content Production in Singapore That Drives Actual Pipeline</h1>
            <h2 className="hero-subhead">Founder-led B2B and demand execution for teams that care about commercial outcomes.</h2>
            <HeroVideoFacade
              videoId="yGTbjlr2pb4"
              title="Chowder Media founder video"
              posterSrc="https://i.ytimg.com/vi/yGTbjlr2pb4/maxresdefault.jpg"
            />
          </div>
        </Section>

        <Section className="offer-section offer-section-top">
          <div className="offer-panel" role="note">
            <h2>
              If Chowder creates your content, we’ll manage paid media with{' '}
              <span className="offer-highlight">no management fee</span>.
            </h2>
            <p>Why? Because we believe that our content will drive results for your business.</p>
          </div>
          <div className="offer-actions">
            <CtaScrollButton location="offer" />
            <p className="founder-note">You’ll hear back from Calvin directly in 3 hours.</p>
          </div>
        </Section>

        <Section className="metrics-section section-alt">
          <div className="metric-grid">
            {metrics.map((item) => (
              <article key={item.stat} className="metric-card">
                <p className="metric-stat">{item.stat}</p>
                <p className="metric-label">{item.label}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section className="problem-section">
          <div className="problem-callout">
            <h2>Most ad accounts are not the bottleneck. Content quality is.</h2>
            <div className="problem-copy">
              <p>
                Running ads is easy. Creating content that earns trust from serious B2B buyers is hard.
              </p>
              <p>
                Chowder closes that gap with strategic messaging, premium production, and activation built around pipeline outcomes.
              </p>
            </div>
          </div>
        </Section>

        <Section className="solution-section">
          <h2>ChowderEngine</h2>
          <p className="engine-subhead">Our proprietary content execution system that delivers in just 2.5 days.</p>
          <div className="pillar-grid">
            {pillars.map((pillar, index) => (
              <article key={pillar.title} className={`pillar-card pillar-card-${index + 1}`}>
                <p className="pillar-number">{`0${index + 1}`}</p>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section className="logos-section section-alt">
          <div className="section-kicker">
            <h2>Trusted by B2B teams across Singapore and beyond.</h2>
          </div>
          <LogoCarousel logos={landingAssets.clientLogos} speed={30} />
        </Section>

        <Section className="comparison-section">
          <h2>Why Chowder vs typical agencies</h2>
          <ComparisonTable rows={comparisonRows} />
        </Section>

        <Section className="cases-section">
          <div className="section-kicker">
            <h2>Case studies built for commercial outcomes.</h2>
          </div>
          <CaseStudiesShowcase caseStudies={landingAssets.caseStudies} />
        </Section>

        <Section className="content-types-section">
          <div className="section-kicker">
            <h2>Content formats we produce for B2B growth teams.</h2>
          </div>
          <div className="content-types-grid">
            {contentTypes.map((type) => (
              <article key={type.title} className="content-type-card">
                <span className="content-type-icon" aria-hidden="true">
                  <ContentTypeIcon icon={type.icon} />
                </span>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section className="faq-section section-alt">
          <h2>FAQ</h2>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <Section className="testimonials-section">
          <div className="section-kicker">
            <h2>What clients say about working with Chowder.</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <p className="quote">“{item.quote}”</p>
                <div className="testimonial-person">
                  <div className="avatar-logo-frame" aria-hidden="true">
                    {item.logoSrc ? (
                      <img src={item.logoSrc} alt={item.logoAlt} className="avatar-logo" loading="lazy" />
                    ) : (
                      <span className="avatar-logo-fallback">{item.logoFallback || item.name}</span>
                    )}
                  </div>
                  <p className="testimonial-name">{item.name}</p>
                  <p className="testimonial-by">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section className="lead-section">
          <h2>Work with us</h2>
          <HubSpotFormPlaceholder trackingParams={trackingParams} />
        </Section>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <p>© {new Date().getFullYear()} Chowder Media. B2B content production Singapore.</p>
          <div className="footer-socials" aria-label="Chowder Media social links">
            <a
              href="https://www.youtube.com/@ChowderMedia"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <svg viewBox="0 0 28 28" aria-hidden="true">
                <path d="M11.109 17.625l7.562-3.906-7.562-3.953v7.859zM14 4.156c5.891 0 9.797 0.281 9.797 0.281 0.547 0.063 1.75 0.063 2.812 1.188 0 0 0.859 0.844 1.109 2.781 0.297 2.266 0.281 4.531 0.281 4.531v2.125s0.016 2.266-0.281 4.531c-0.25 1.922-1.109 2.781-1.109 2.781-1.062 1.109-2.266 1.109-2.812 1.172 0 0-3.906 0.297-9.797 0.297v0c-7.281-0.063-9.516-0.281-9.516-0.281-0.625-0.109-2.031-0.078-3.094-1.188 0 0-0.859-0.859-1.109-2.781-0.297-2.266-0.281-4.531-0.281-4.531v-2.125s-0.016-2.266 0.281-4.531c0.25-1.937 1.109-2.781 1.109-2.781 1.062-1.125 2.266-1.125 2.812-1.188 0 0 3.906-0.281 9.797-0.281v0z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/chowdermedia/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <svg viewBox="0 0 24 28" aria-hidden="true">
                <path d="M3.703 22.094h3.609v-10.844h-3.609v10.844zM7.547 7.906c-0.016-1.062-0.781-1.875-2.016-1.875s-2.047 0.812-2.047 1.875c0 1.031 0.781 1.875 2 1.875h0.016c1.266 0 2.047-0.844 2.047-1.875zM16.688 22.094h3.609v-6.219c0-3.328-1.781-4.875-4.156-4.875-1.937 0-2.797 1.078-3.266 1.828h0.031v-1.578h-3.609s0.047 1.016 0 10.844v0h3.609v-6.062c0-0.313 0.016-0.641 0.109-0.875 0.266-0.641 0.859-1.313 1.859-1.313 1.297 0 1.813 0.984 1.813 2.453v5.797zM24 6.5v15c0 2.484-2.016 4.5-4.5 4.5h-15c-2.484 0-4.5-2.016-4.5-4.5v-15c0-2.484 2.016-4.5 4.5-4.5h15c2.484 0 4.5 2.016 4.5 4.5z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
