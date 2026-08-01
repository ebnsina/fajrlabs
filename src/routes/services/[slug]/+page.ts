import { error } from '@sveltejs/kit';
import { findService } from '#lib/content/services.js';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const service = findService(params.slug);
	if (!service) error(404, 'We could not find that service.');

	return { service };
};
