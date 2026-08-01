import { site } from '#lib/content/site.js';
import { services } from '#lib/content/services.js';
import { publishedPosts } from '#lib/content/posts.js';
import { work } from '#lib/content/work.js';
import type { RequestHandler } from './$types';

const staticPaths = [
	'/',
	'/services',
	'/work',
	'/halal-by-design',
	'/process',
	'/engagements',
	'/faq',
	'/writing',
	'/about',
	'/contact',
	'/changelog'
];

export const GET: RequestHandler = () => {
	const paths = [
		...staticPaths,
		...services.map((service) => `/services/${service.slug}`),
		...publishedPosts.map((post) => `/writing/${post.slug}`),
		...work.map((item) => `/work/${item.slug}`)
	];

	const urls = paths
		.map((path) => `\t<url><loc>${new URL(path, site.url).href}</loc></url>`)
		.join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`,
		{ headers: { 'content-type': 'application/xml', 'cache-control': 'max-age=3600' } }
	);
};
