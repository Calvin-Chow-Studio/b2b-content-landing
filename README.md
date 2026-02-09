# Know Your Next Move

A minimal, mobile-first beta UI for the Chowder Media YouTube analysis lead magnet.

## What is included
- Landing experience with YouTube link input
- Loading state and results layout
- Email gate for the story tree
- Mock data wiring so you can review the flow quickly
- Supabase insert hooks for leads and analyses

## Quick start
Open `index.html` in a browser.

## Configure Supabase
Open `config.js` and set:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- Table names if you want to change them

When those are set, the app will POST to Supabase REST endpoints.

## Tables
Suggested schema is in `supabase.sql`.

## Replace the logo
Swap `assets/chowder-logo-placeholder.svg` with your real logo file. Keep the same file name or update `index.html`.

## Notes
- Analysis is mocked until a backend is wired in.
- PDF delivery is represented by a placeholder button. In production, send a download link via email.
