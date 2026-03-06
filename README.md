# Chowder Media B2B Content Production Landing Page

Premium Google Ads landing page for Chowder Media, built in Next.js for the `go.chowdermedia.com` subdomain.

## Live route

- Landing page: `/b2b-content-production`
- Thank-you page: `/thank-you-b2b-content`
- Root `/` redirects to `/b2b-content-production` and preserves tracking parameters

## Stack

- Next.js 14
- React 18
- Global CSS
- No UI kit or heavy frontend dependencies

## Core behaviour

- Single primary CTA path: lead form submission
- HubSpot embedded form
- UTM preservation across landing page and thank-you redirect
- GTM installed with container `GTM-KZF33FXK`
- Google Ads / GA4 / Meta-ready event hooks via `dataLayer`

## Local development

Run:

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000/b2b-content-production
```

## Build

```bash
npm run build
npm run start
```

## Key files

- `app/b2b-content-production/page.js`
  Main landing page route
- `app/thank-you-b2b-content/page.js`
  Post-submit thank-you page
- `components/landing/LandingPage.jsx`
  Primary landing page composition
- `components/landing/HubSpotFormPlaceholder.jsx`
  HubSpot embed and thank-you redirect handling
- `components/analytics/TrackingScripts.jsx`
  GTM bootstrap
- `lib/analytics.js`
  `dataLayer` event helpers
- `lib/tracking.js`
  UTM extraction and query persistence

## Tracking

Current GTM container:

- `GTM-KZF33FXK`

Current preserved params:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `gclid`
- `fbclid`
- `msclkid`
- `ttclid`

Recommended conversion trigger:

- Fire lead/conversion tags on `/thank-you-b2b-content`
- Or listen for the custom lead event pushed to `dataLayer`

## HubSpot form

Embedded via HubSpot script using:

- Portal ID: `43695545`
- Form ID: `f6fbe3cf-437d-4323-b685-db21fa7c6569`
- Region: `na2`

Form submits redirect to:

- `/thank-you-b2b-content`

## Assets

- Brand assets: `public/brand`
- Client logos: `public/clients`
- Optimized assets: `public/optimized`
- Landing visuals: `public/landing/b2b`

To regenerate optimized assets:

```bash
npm run optimize:assets
```

## Deployment target

Intended host:

- `https://go.chowdermedia.com`

Canonical landing URL:

- `https://go.chowdermedia.com/b2b-content-production`

## Plesk deployment

Recommended approach:

1. Push this repo to GitHub
2. Connect the repo to Plesk Git on the `go.chowdermedia.com` subdomain
3. Enable Node.js in Plesk
4. Set the application root to this project folder
5. Run:

```bash
npm install
npm run build
```

6. Start the app with:

```bash
npm run start
```

If Plesk requires a startup file instead of a startup command, add a custom server entrypoint before deployment.

## Notes

- The old YouTube analysis lead magnet README does not apply to this project anymore.
- Root-level legacy routes now redirect to the B2B landing and thank-you routes.
- This project is optimized for paid traffic, fast loading, and a single conversion path.
