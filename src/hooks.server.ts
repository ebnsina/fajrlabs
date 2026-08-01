import type { HandleServerError } from '@sveltejs/kit';

/**
 * Unexpected failures are logged in full for us and reduced to a plain sentence
 * for the visitor. The reference lets someone quote the exact failure to us.
 */
export const handleError: HandleServerError = ({ error, event, status }) => {
	const reference = crypto.randomUUID().slice(0, 8);

	// A missing page is not a fault; only real failures are worth the noise.
	if (status >= 500) {
		console.error(`[${reference}] ${status} on ${event.url.pathname}`, error);
	}

	return {
		message: 'Something went wrong at our end, not yours.',
		reference
	};
};
