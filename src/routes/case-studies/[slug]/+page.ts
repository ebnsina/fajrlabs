import { error } from '@sveltejs/kit';
import { findCaseStudy } from '#lib/content/case-studies.js';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const item = findCaseStudy(params.slug);
	if (!item) error(404, 'We could not find that case study.');

	return { item };
};
