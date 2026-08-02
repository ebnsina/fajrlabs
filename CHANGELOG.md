# Changelog

All notable changes to this site are recorded here. This file mirrors
`src/lib/content/changelog.ts`, which powers the public `/changelog` page — keep
the two in step.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and
this project uses [semantic versioning](https://semver.org/spec/v2.0.0.html).

## [0.10.0] — 2026-08-02

### Changed

- `/design` now copies a **DESIGN.md** rather than freeform Markdown — the
  format at github.com/google-labs-code/design.md. YAML front matter carrying
  the tokens a machine reads, then the reasoning, in that spec's eight sections
  in its order. Verified with the official linter: **0 errors**, and it exports
  cleanly to `css-vars`, `tailwind` and `dtcg`.
- The page renders those sections in the same order as the file, so the two
  cannot drift apart.

### Added

- **Elevation & Depth** and **Shapes**, neither of which had ever been written
  down. `rounded` is declared in the front matter's `omitted` list with a
  reason, which is the format's way of saying "square on purpose" rather than
  "forgot to define".
- **Do's and Don'ts** — the guardrails, each one written after getting it wrong
  once: prefix before standard property, never mark an edge twice, never animate
  `autoAlpha`, never a `from` tween on something already visible.
- Machine-readable typography levels and component tokens. The width axis is
  carried as `fontVariation`, which the format has a key for.

### Fixed

- The motion rules still described a 1.2s failsafe that removes an
  `html.motion` class. That mechanism was deleted in 0.8.1, so the design system
  was documenting something the site no longer does.
- `button-ghost` and `service-row` declared a `transparent` background, which
  the linter reads as `#00000000` and reports as failing contrast. They name the
  paper colour they actually sit on, so the check measures something real.

## [0.9.0] — 2026-08-02

### Added

- A spatial reveal on the appearance switch. The new theme is clipped open as a
  circle growing from the button, so the change reads as coming from the control
  that was pressed. The origin is the button's own centre rather than the
  pointer, so a keyboard press does not wipe in from the top-left corner.
- The cross-page fade is back, with the cause of the flash actually fixed:
  every snapshot now carries `background-color`. A view transition replaces the
  live page with pictures of it, and whatever shows through a partly transparent
  one is the bare browser canvas — black under a dark colour-scheme. Painting
  the snapshots means there is nothing to see through.
- `mix-blend-mode: normal` on the snapshots. The default is `plus-lighter`,
  which suits a plain cross-fade and would have blown the theme wipe out to
  white where the two themes overlapped.
- Page and theme transitions are scoped by a class each, because both animate
  the same `root` snapshot and would otherwise inherit each other's styles.

### Fixed

- The reveal circle opened from the middle of the page instead of the button on
  any screen with a device pixel ratio above 1 — every recent phone, and most
  laptops. The snapshot is sized in device pixels, so a coordinate given in
  pixels lands at half its intended position. Every value in the clip is now a
  percentage, which resolves against the same box whatever its scale.

## [0.8.1] — 2026-08-02

### Fixed

- Content flashed on navigation, worst on iOS. Three causes, all opacity:
  - Reveals were `gsap.from(..., { opacity: 0 })`, and a `from` tween applies
    its start state when it is built — after the browser has painted. Anything
    already on screen went visible, snapped to transparent, then faded back in.
    Elements already past their trigger are now left alone entirely, and the
    heading, which cannot be skipped, has its start state set synchronously in
    the attachment, before paint.
  - The page transition faded the outgoing page out in 90ms while fading the
    incoming one in over 220ms, so for a moment neither was opaque and the
    backdrop showed through. The outgoing page now holds and the new one covers
    it.
  - iOS 18 supports view transitions, so an iPhone ran the crossfade _and_ the
    reveal on top of each other.
- The page transition ignored data-saver and 2G, where all other motion is
  switched off. It now checks the same capability tier as everything else.

### Removed

- The cross-page fade, and the View Transitions API call behind it. A view
  transition replaces the live content with snapshots, and whatever shows
  through underneath is the page background — black in the dark theme. Any
  frame where the snapshots are not fully opaque flashes black, which is what
  iOS was reporting. Two attempts at tuning the timing did not settle it, and a
  decorative fade is not worth a visible fault on the device most people use.
  Navigation is instant instead.
- A script in `app.html` that added an `html.motion` class and removed it after
  1.2s as a failsafe against content being left invisible. Nothing in the CSS
  ever read the class, so it protected nothing. The guarantee now sits in the
  one place that hides anything, with a timeout that restores the heading if the
  motion engine never answers.

## [0.8.0] — 2026-08-02

### Added

- The first two pieces on `/writing`. **Why this studio exists** — why the
  standard was written down before deciding what to build, and why the order
  matters. **What we do differently, and what it costs** — six differences,
  each with the price it carries, because a difference with no cost is a slogan.
- `Aurora`, a monochrome gradient generated from a seed rather than shipped as
  a file. Every piece gets its own without anyone making one, there is no image
  to load, and it cannot go stale. Greys only: the noise is desaturated inside
  the SVG filter, since `feTurbulence` produces colour.
- Subheadings in a piece, via a `PostBlock` that is either a paragraph or a
  heading. The longer piece is unreadable as one column of paragraphs.

### Changed

- Writing is in the main menu, between Process and About. It was in the footer
  only because it had nothing published; now it does. Six items rather than
  five, placed where the argument sits before the studio that makes it.
- `/writing` is a grid of cards, each led by its own artwork, instead of a list
  of rules. The artwork is the card's edge, so there is no border and no
  background change marking the same edge twice.

### Fixed

- Opening a question on `/faq` rotated the marker 135°, which turned the square
  into a diamond and the plus into a tilted cross. The square now holds still
  and the plus cross-fades to a minus — a plus cannot be rotated into a minus,
  so both glyphs are stacked instead.

## [0.7.6] — 2026-08-02

### Added

- The WhatsApp number in the details list on About, next to the email, so both
  ways of reaching the studio sit together rather than only on Contact.

- WhatsApp in the structured data, as a `ContactPoint` on the organisation and a
  `ContactPage` on Contact. It carries a `url` and `contactOption: WhatsApp`,
  and deliberately no `telephone` — the number is not a phone line, and saying
  it was would have invited calls. `/llms.txt` carries the link as well as the
  number.
- `format-detection: telephone=no`, because iOS silently turns any bare number
  in the text into a call button. On Contact the number sat outside the link as
  plain text, so tapping it on an iPhone offered to dial rather than open
  WhatsApp. It is now inside the link.

### Changed

- Languages on About read as a closed list of two. It now invites the reader to
  ask about another, which is an opening rather than a limit — and stops short
  of claiming fluency the studio has not stated.
- Both WhatsApp links open in a new tab, so an enquiry half-typed into the form
  is not lost by leaving the page.

## [0.7.5] — 2026-08-02

### Added

- Screenshots on the Safar case study: the search results, and a trip with a
  seat chosen. Each is captioned with the claim it evidences — the fee sitting
  beside the fare, and the ten-minute seat hold — rather than being decoration.
- An optional `image` on `Seo`, so a page can override the social card. A case
  study now shares its own screenshot when linked, at the picture's real
  dimensions.

## [0.7.4] — 2026-08-02

### Added

- A link to Safar from its case study, the index and `/llms.txt`.

### Changed

- The Safar write-up said "Safar is not live", which stopped being true the
  moment it had a public URL. It now says you can open and use it, and is
  precise about what it is not: generated timetables, no real operators, and
  nothing booked will carry you anywhere.

## [0.7.3] — 2026-08-02

### Changed

- Claims of past client work softened to statements of intent. The site said
  "yes, and we have" about turning down a budget, "many of our clients", "it
  has cost us work" and "most of our work is this" — all written by me, none
  supported by any published client project. They now state what the studio
  will do rather than what it has done.
- The public changelog no longer narrates internal craft: menu item counts,
  hover behaviour, header rendering, copy edits.

### Added

- WhatsApp on the contact page, alongside email.

### Fixed

- `/llms.txt` said "the three engagement models" after the third was removed.

## [0.7.2] — 2026-08-02

### Removed

- A line on the About page explaining why the name carries a second word. It
  was an internal aside, not something a visitor should read.

## [0.7.1] — 2026-08-02

### Changed

- The main menu is five items instead of seven, ordered as a buyer asks the
  questions: Services, Case studies, Halal by design, Process, About. Working
  together and Writing move to the footer — Writing had nothing published, so
  the menu was pointing at an empty page.
- Pointing at a menu item recedes the others, so attention lands where the
  pointer is. Keyboard focus does the same.

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
