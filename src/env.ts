import { defineEnvVars } from '@sveltejs/kit/env';
import * as v from 'valibot';

/**
 * Declared here, supplied at runtime. The schemas allow `undefined` so that a
 * build never needs production secrets — a build server has no business holding
 * them, and preview deployments should not require them either.
 *
 * Presence is enforced where the values are actually used, in
 * `src/lib/server/email.ts`, which fails loudly rather than sending nothing.
 * There are still no defaults and no fallbacks anywhere.
 */
export const variables = defineEnvVars({
	RESEND_API_KEY: {
		schema: v.optional(v.string()),
		description: 'Resend API key used to deliver enquiries. Create one at resend.com/api-keys.'
	},
	CONTACT_TO_EMAIL: {
		schema: v.optional(v.string()),
		description: 'Mailbox that receives enquiries from the contact form.'
	},
	CONTACT_FROM_EMAIL: {
		schema: v.optional(v.string()),
		description: 'Verified Resend sender, e.g. "FajrLabs <salam@fajrlabs.io>".'
	}
});
