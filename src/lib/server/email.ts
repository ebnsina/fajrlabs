import { Resend } from 'resend';
import { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } from '$app/env/private';
import { serviceLabel, type Enquiry } from '#lib/schemas/enquiry.js';
import { site } from '#lib/content/site.js';

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
	const resend = new Resend(RESEND_API_KEY);

	const { error } = await resend.emails.send({
		from: CONTACT_FROM_EMAIL,
		to: CONTACT_TO_EMAIL,
		replyTo: enquiry.email,
		subject: `${site.name} enquiry — ${enquiry.name} (${serviceLabel(enquiry.service)})`,
		html: toHtml(enquiry),
		text: toText(enquiry)
	});

	if (error) throw new EmailDeliveryError(error.message);
}
