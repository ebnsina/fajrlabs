# Fajr Labs

A monochrome studio site. SvelteKit 3 (pre-release) + Svelte 5 runes, Tailwind
preflight only, deployed to Vercel.

## Git and commits

- Author every commit as **`ebnsina <ebnsina.me@gmail.com>`**. Set per repo:
  `git config user.name "ebnsina" && git config user.email "ebnsina.me@gmail.com"`
- **Never** add a `Co-Authored-By: Claude` trailer, and never use another identity.
- Remote uses the **`github-es`** SSH host alias: `git@github-es:ebnsina/fajrlabs.git`
- `docs/` and `data/` are gitignored. Keep planning notes and secrets out of the
  public repo.

## When you add or change anything, update everything it touches

This is the rule that gets forgotten. Adding a page, a service or a content
module is not finished until the things that describe the site agree with it.
Work down this list every time:

| Add or change                      | Also update                                                                                                       |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| A new route                        | `src/routes/sitemap.xml/+server.ts`, and the nav or footer in `src/lib/content/site.ts` if it should be reachable |
| Any page                           | `<Seo>` with a real `title` and `description`; add `schema` if a schema.org type fits (Service, FAQPage, Article) |
| A service, engagement, FAQ or post | `src/routes/llms.txt/+server.ts` reads from the content modules — check the new thing actually appears there      |
| Brand facts in `site.ts`           | Regenerate the social image: `pnpm og`                                                                            |
| The logo mark                      | Regenerate icons: `pnpm icons`                                                                                    |
| Anything user-visible              | `CHANGELOG.md` **and** `src/lib/content/changelog.ts` — they mirror each other                                    |
| A new interactive element          | Keyboard reachable, visible focus ring, correct ARIA, 24×24 minimum target                                        |

`/llms.txt`, the sitemap and the structured data are all generated from the
content modules on purpose, so they cannot drift. Keep it that way: derive, do
not hand-maintain a second copy.

## Design

The full system is at `/ds` (unlinked, noindex) and its single source is
`src/lib/content/design-system.ts`. Read it before changing anything visual.

The rules most often broken:

- **Monochrome, no exceptions.** No hue anywhere, including for state. Hierarchy
  comes from weight, width and space. If a fix seems to need colour, it does not.
- Mona Sans for everything, using its width axis. Geist Mono only for numbers,
  labels, metadata and tabular data.
- Whitespace before rules. Never a border _and_ a background change marking the
  same edge.
- Vendor prefixes go **before** the standard property, or the minifier drops the
  standard one.

## Code

- Modular, clean, readable. Match the surrounding style. Comments 1–2 lines, and
  only where the reason is not obvious from the code.
- **Use context7 for library docs.** Do not answer from memory about an API.
- Validation with **valibot**, one schema shared by browser and server.
- Environment variables are declared in `src/env.ts` with no defaults and no
  fallbacks. They are checked where they are used, not at build time — a build
  must never need production secrets.
- Errors are a single source of truth in the API layer. The browser only
  displays the message. `src/lib/messages.ts` holds the user-facing wording.
- Formatting via the **Intl** web APIs, never hand-rolled.
- Icons from HugeIcons, registered in `src/lib/icons.ts`.
- Handle 404, 500 and every failure path gracefully.

## Motion

- GSAP is loaded with a dynamic import and must never block first paint.
- **Never animate `autoAlpha` or anything setting `visibility: hidden`.** It
  removes elements from the tab order and the accessibility tree, and content
  below the fold becomes unreachable by keyboard.
- Animations are additive: content ships visible and usable without them.
- Respect `prefers-reduced-motion`, data-saver and weak devices — see
  `src/lib/motion/capability.ts`.

## Content

- Plain language for a business owner. No jargon.
- **Invent nothing.** No clients, testimonials, statistics, timelines, awards or
  capabilities unless given. If a sentence needs a fact to be true, ask for it or
  cut it. This has caused real errors: an engagement the studio does not offer
  was written into the site and had to be removed.
- **What the owner tells you is context, not copy.** Explanations, asides and
  reasoning given in chat are there so you understand the brief. They are not
  approved text and usually should never appear on the site. Anything internal —
  why a name was picked, what a domain cost, what a constraint was — stays
  internal unless he explicitly says to publish it. This has gone wrong twice:
  "Labs is there because the domain needed a second word" was an aside that
  ended up on the About page, and an earlier draft published explanatory
  language he had written to brief me. When in doubt, leave it out and ask.
- Brand facts are placeholders in `src/lib/content/site.ts` until confirmed.
