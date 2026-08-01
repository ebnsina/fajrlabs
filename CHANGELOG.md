# Changelog

All notable changes to this site are recorded here. This file mirrors
`src/lib/content/changelog.ts`, which powers the public `/changelog` page — keep
the two in step.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and
this project uses [semantic versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] — 2026-08-01

### Changed

- Deploys to Vercel via `@sveltejs/adapter-vercel` instead of Cloudflare Pages.
  Wrangler, the generated worker types and the Cloudflare `App.Platform`
  bindings are all removed; environment variables now come from the Vercel
  project settings.

## [0.2.0] — 2026-08-01

Motion, added without putting the content behind it.

### Added

- Masked heading reveals, staggered section entrances and magnetic buttons, via GSAP
- A custom cursor that inverts against the page and labels itself over service rows

### Changed

- GSAP loads on demand, so it never blocks the first paint

### Notes

- Motion is skipped entirely for `prefers-reduced-motion`, data-saver and 2G, and
  runs shorter on low-core or low-memory devices
- A 1.2s failsafe in `app.html` reveals everything if the motion script never
  arrives, so a blocked or failed download can never leave the page blank
- The custom cursor never initialises on touch devices, and the real pointer is
  only hidden once ours is running

## [0.1.0] — 2026-08-01

First public version of the site.

### Added

- Home, services, process, working together, about and contact pages
- A page per service: custom software, mobile apps, custom plugins, AI automations
- The Halal by design standard, published in full
- Common questions, writing (empty until the first piece is published) and this changelog
- Enquiry form with checks as you type and email delivery through Resend
- Light and dark appearance, following the visitor's device by default
- Friendly pages for missing pages and unexpected problems, with a reference code
- The Qur'an and hadith the standard rests on, quoted with references
- `sitemap.xml`, `robots.txt`, social preview image, and per-page meta and Open Graph tags

### Changed

- Reduced dividing lines throughout; columns now align row-for-row using CSS subgrid
- Sticky header blends into the page with a blur and fade instead of a hard rule
- Rewrote all copy shorter and sharper; it read as an explanation rather than as website writing
- Ticks and crosses are bare glyphs everywhere; a bordered box now means "interactive control"
- Four-item lists use a 2×2 grid so nothing is left orphaned on a second row

### Notes

- Brand details (name, email, domain, location) are placeholders. They live in
  `src/lib/content/site.ts` and only need changing in that one file.
- `src/lib/content/about.ts` carries a `TODO` for the studio's own story.
