import { error } from '@sveltejs/kit';
import { findWork } from '#lib/content/work.js';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const item = findWork(params.slug);
	if (!item) error(404, 'We could not find that project.');

	return { item };
};
