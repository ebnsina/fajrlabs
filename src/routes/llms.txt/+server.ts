import { site } from '#lib/content/site.js';
import { services } from '#lib/content/services.js';
import { ethics } from '#lib/content/ethics.js';
import { engagements } from '#lib/content/engagements.js';
import { publishedPosts } from '#lib/content/posts.js';
import { caseStudies } from '#lib/content/case-studies.js';
import type { RequestHandler } from './$types';

/**
 * A plain-text summary for language models, following the llms.txt convention.
 * Generated from the same content modules as the pages, so it cannot drift.
 */
export const GET: RequestHandler = () => {
	const url = (path: string) => new URL(path, site.url).href;

	const body = `# ${site.name}

> ${site.description}

${site.name} is a software studio. Its defining characteristic is a published
ethical standard called "Halal by design": it states in writing which work it
will not take on, and applies that test to every enquiry before quoting.

## What it builds

${services
	.map((s) => `- [${s.name}](${url(`/services/${s.slug}`)}): ${s.oneLine} Typically ${s.duration}.`)
	.join('\n')}

## Work it accepts

${ethics.accept.map((item) => `- ${item.title}: ${item.note}`).join('\n')}

## Work it declines

${ethics.decline.map((item) => `- ${item.title}: ${item.note}`).join('\n')}

## What it is building

${caseStudies
	.map(
		(w) =>
			`- [${w.name}](${url(`/case-studies/${w.slug}`)}): ${w.oneLine} ${w.sector}. Status: ${w.status}.`
	)
	.join('\n')}

## How it engages

${engagements.options.map((o) => `- ${o.name}: ${o.summary} ${o.commitment}`).join('\n')}

Rates are not published. A fixed price is given within about a week of the
first call.

## Pages

- [Services](${url('/services')}): all four capabilities
- [Case studies](${url('/case-studies')}): what the studio is building, and why
- [Halal by design](${url('/halal-by-design')}): the full standard, and the Qur'an and hadith it rests on
- [Process](${url('/process')}): how a project runs, stage by stage
- [Working together](${url('/engagements')}): how the studio engages
- [Common questions](${url('/faq')}): pricing, timing, ownership, confidentiality
- [About](${url('/about')}): the studio
- [Contact](${url('/contact')}): enquiry form
- [Changelog](${url('/changelog')}): what has changed on this site
${publishedPosts.length ? `\n## Writing\n\n${publishedPosts.map((p) => `- [${p.title}](${url(`/writing/${p.slug}`)}): ${p.summary}`).join('\n')}` : ''}

## Contact

Email: ${site.email}
WhatsApp: ${site.whatsapp.display}
Location: ${site.location}
Replies within one working day.
`;

	return new Response(body, {
		headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'max-age=3600' }
	});
};
