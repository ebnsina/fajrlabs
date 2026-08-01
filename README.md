# FajrLabs

The FajrLabs studio site. SvelteKit on Vercel.

## Running it

```sh
pnpm install
cp .env.example .env   # fill in the values, see Configuration
pnpm dev
```

| Command        | What it does                                         |
| -------------- | ---------------------------------------------------- |
| `pnpm dev`     | Development server on http://localhost:5173          |
| `pnpm build`   | Production build for Vercel                          |
| `pnpm preview` | Serve the production build locally                   |
| `pnpm check`   | Type-check everything                                |
| `pnpm lint`    | Formatting and lint checks                           |
| `pnpm format`  | Rewrite files to match the formatting rules          |
| `pnpm og`      | Regenerate `static/og.png`, the social preview image |
| `pnpm icons`   | Regenerate the favicon and app icon set              |

## Configuration

Environment variables are declared in `src/env.ts` and supplied at runtime.
There are no defaults and no fallbacks anywhere.

The build deliberately does **not** require them: compiling the site should not
need production secrets, and preview deployments should not hold them. Presence
is enforced at the point of use in `src/lib/server/email.ts`, which throws
rather than sending nothing. A missing key means enquiries fail loudly in the
logs while the visitor sees a plain apology and your email address.

| Variable             | Used for                                               |
| -------------------- | ------------------------------------------------------ |
| `RESEND_API_KEY`     | Sending enquiries. Create a key at resend.com/api-keys |
| `CONTACT_TO_EMAIL`   | The mailbox enquiries arrive in                        |
| `CONTACT_FROM_EMAIL` | The verified Resend sender, e.g. `FajrLabs <hello@…>`  |

Locally these come from `.env`. In production add them under **Project →
Settings → Environment Variables** in Vercel, for every environment you deploy
(Production, Preview and Development). Never commit them.

## Where things live

```
src/
  env.ts               Environment variables, declared and validated
  hooks.server.ts      Turns unexpected failures into a friendly message + reference
  lib/
    content/           All site copy. Change words here, not in components.
    components/        Shared UI
    schemas/           Validation shared by the browser and the server
    server/            Server-only code (email delivery)
    icons.ts           Every icon used, in one place
    messages.ts        The user-facing wording for enquiry outcomes
    motion.ts          Scroll reveal
    theme.svelte.ts    Light and dark appearance
    utils/format.ts    Dates and lists, via the Intl web APIs
  routes/              Pages, plus layout.css which holds the design tokens
```

### Editing the site

- **Words** live in `src/lib/content/`. Brand facts — name, email, domain,
  location — are in `site.ts` and reused everywhere else.
- **Writing**: add an entry to `posts.ts`. Drafts stay hidden until you set
  `draft: false` and give it a real date.
- **Changelog**: update `changelog.ts` and `CHANGELOG.md` together.

### Design

Monochrome and typographic. Mona Sans throughout, using its width axis (75–125)
to do the work display type usually needs a second family for, with Geist Mono
for numbers, labels and data.

Colour, spacing and motion are CSS custom properties at the top of
`src/routes/layout.css`, redefined once under `:root[data-theme='dark']`.
Components style themselves through those tokens in scoped `<style>` blocks, so
there is one place to change a colour and no utility-class soup in the markup.

## Errors

The API layer is the single source of truth. `src/lib/messages.ts` holds the
only wording a visitor sees about an enquiry; the server decides which applies
and the browser just displays it. Technical detail is logged, never shown.

Unexpected failures get a short reference code shown on the error page, so
someone can quote it and you can find it in the logs.

## Deploying

Builds for Vercel via `@sveltejs/adapter-vercel`. Import the repository in
Vercel and it detects SvelteKit on its own — the defaults are correct, so no
build settings need changing:

| Setting          | Value          |
| ---------------- | -------------- |
| Framework        | SvelteKit      |
| Build command    | `pnpm build`   |
| Install command  | `pnpm install` |
| Output directory | (leave blank)  |

The build succeeds without the environment variables, so a first deploy will
not be blocked. Add them before you point real traffic at the site, though —
until they are set, every enquiry is logged as a failure and the visitor is
asked to email instead.

Every branch gets its own preview URL, which is how the two design directions
can be compared: `main` is the still version, `motion` adds the animation.
