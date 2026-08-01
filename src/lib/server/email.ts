import { Resend } from 'resend';
import { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } from '$app/env/private';
import { serviceLabel, type Enquiry } from '#lib/schemas/enquiry.js';
import { site } from '#lib/content/site.js';

export class ConfigurationError extends Error {
	constructor(missing: string[]) {
		super(`Enquiries cannot be sent. Missing configuration: ${missing.join(', ')}`);
		this.name = 'ConfigurationError';
	}
}

/** The single place configuration is checked. No defaults, no fallbacks. */
function requireConfig() {
	const config = {
		apiKey: RESEND_API_KEY,
		to: CONTACT_TO_EMAIL,
		from: CONTACT_FROM_EMAIL
	};

	const missing = Object.entries({
		RESEND_API_KEY,
		CONTACT_TO_EMAIL,
		CONTACT_FROM_EMAIL
	})
		.filter(([, value]) => !value?.trim())
		.map(([name]) => name);

	if (missing.length > 0) throw new ConfigurationError(missing);

	return config as { apiKey: string; to: string; from: string };
}

export class EmailDeliveryError extends Error {
	constructor(reason: string) {
		super(`Resend rejected the message: ${reason}`);
		this.name = 'EmailDeliveryError';
	}
}

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function buildRows(enquiry: Enquiry): [string, string][] {
	return [
		['Name', enquiry.name],
		['Email', enquiry.email],
		['Organisation', enquiry.organisation || '—'],
		['Interested in', serviceLabel(enquiry.service)]
	];
}

function toHtml(enquiry: Enquiry): string {
	const rows = buildRows(enquiry)
		.map(
			([label, value]) =>
				`<tr><td style="padding:4px 16px 4px 0;color:#6b7280">${label}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`
		)
		.join('');

	return `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6">
<h2 style="margin:0 0 16px;font-size:17px">New enquiry from ${escapeHtml(enquiry.name)}</h2>
<table style="border-collapse:collapse;margin-bottom:20px">${rows}</table>
<div style="white-space:pre-wrap;border-top:1px solid #e5e7eb;padding-top:16px">${escapeHtml(enquiry.message)}</div>
</div>`;
}

function toText(enquiry: Enquiry): string {
	const rows = buildRows(enquiry)
		.map(([label, value]) => `${label}: ${value}`)
		.join('\n');
	return `New enquiry from ${enquiry.name}\n\n${rows}\n\n${enquiry.message}`;
}

export async function sendEnquiry(enquiry: Enquiry): Promise<void> {
	const config = requireConfig();
	const resend = new Resend(config.apiKey);

	const { error } = await resend.emails.send({
		from: config.from,
		to: config.to,
		replyTo: enquiry.email,
		subject: `${site.name} enquiry — ${enquiry.name} (${serviceLabel(enquiry.service)})`,
		html: toHtml(enquiry),
		text: toText(enquiry)
	});

	if (error) throw new EmailDeliveryError(error.message);
}
