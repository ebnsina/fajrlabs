import { defineEnvVars } from '@sveltejs/kit/env';
import * as v from 'valibot';

/**
 * Every environment variable the site needs, with no defaults anywhere. A
 * missing or malformed value fails loudly rather than quietly dropping enquiries.
 */
export const variables = defineEnvVars({
	RESEND_API_KEY: {
		schema: v.pipe(v.string(), v.nonEmpty()),
		description: 'Resend API key used to deliver enquiries. Create one at resend.com/api-keys.'
	},
	CONTACT_TO_EMAIL: {
		schema: v.pipe(v.string(), v.email()),
		description: 'Mailbox that receives enquiries from the contact form.'
	},
	CONTACT_FROM_EMAIL: {
		schema: v.pipe(v.string(), v.nonEmpty()),
		description: 'Verified Resend sender, e.g. "FajrLabs <salam@fajrlabs.io>".'
	}
});
