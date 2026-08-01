import { error } from '@sveltejs/kit';
import { findPublishedPost } from '#lib/content/posts.js';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const post = findPublishedPost(params.slug);
	if (!post) error(404, 'We could not find that piece of writing.');

	return { post };
};
