# Changelog

All notable changes to this site are recorded here. This file mirrors
`src/lib/content/changelog.ts`, which powers the public `/changelog` page — keep
the two in step.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and
this project uses [semantic versioning](https://semver.org/spec/v2.0.0.html).

## [0.7.0] — 2026-08-02

### Added

- A Case studies section: an index and a write-up per project, in the main nav
  and the footer. The first entry is Safar, a travel booking product the studio
  is building. Written as the problem it solves and the decisions taken, not as
  a list of technology, and it states plainly that it is not live.

## [0.6.0] — 2026-08-01

### Added

- `/design`, an unlinked reference page setting out the whole design system,
  with a button that copies it as Markdown for handing to a language model.
  Rendered and copied from one source, so the two cannot drift.
- "Why Fajr" on the About page: what the word means and why it was chosen.

## [0.5.1] — 2026-08-01

### Removed

- "Alongside your team" as an engagement. The studio does not join other
  people's teams; the option was written in error and is gone.

### Changed

- Ongoing support now says plainly that it covers work the studio built itself

## [0.5.0] — 2026-08-01

### Fixed

- Content below the fold was hidden with `visibility: hidden` while waiting to
  animate, which took it out of the tab order entirely. On the questions page
  only 4 of 13 disclosures could be reached by keyboard; now all 13 can.
- Form fields had their focus ring suppressed, and validation messages were not
  associated with their inputs.
- The native cursor was hidden before the custom one existed, leaving desktop
  keyboard users with no pointer at all.
- The skip link did not move focus, and was unreachable part-way down a page.
- Escape in the mobile menu dumped focus to the page; the menu could be left
  open and unclosable when widening past the breakpoint; mobile links had no
  current-page indication.
- Headings on the standard page skipped a level.
- Display headings were clipped: the reveal masked each line to its line box,
  cutting descenders.

### Added

- Favicons at every size, a web manifest, and a theme colour per scheme
- Structured data (Organization, WebSite, plus Service and FAQ pages)
- `/llms.txt`, generated from the same content as the pages

### Changed

- Rail labels now appear on hover, and stay visible on touch and when focused
- Heading reveals lift the whole heading rather than splitting it into lines

## [0.4.0] — 2026-08-01

### Added

- The wordmark rolls to `فَجْر` on hover — dawn, and the dawn prayer

### Changed

- The name is set as "Fajr Labs", with a space, everywhere it appears

### Fixed

- The sticky header's blur was being stripped from the built CSS, because the
  vendor prefix was written after the standard property and the minifier kept
  only the last of the pair. Page content showed through the header unblurred.

## [0.3.0] — 2026-08-01

### Changed

- Deploys to Vercel via `@sveltejs/adapter-vercel` instead of Cloudflare Pages.
  Wrangler, the generated worker types and the Cloudflare `App.Platform`
  bindings are all removed; environment variables now come from the Vercel
  project settings.
- Environment variables are no longer required to build. Compiling the site
  should not need production secrets, and preview deployments should not hold
  them. Presence is enforced where the values are used instead, so a missing
  key fails loudly at send time rather than blocking the build.

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
