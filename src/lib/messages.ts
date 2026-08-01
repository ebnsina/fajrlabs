/**
 * Single source of truth for what a visitor is told about an enquiry. The server
 * decides which of these applies; the browser only ever displays the message.
 */
export const enquiryMessages = {
	sent: 'Thank you — your message is on its way. We reply to every enquiry within one working day.',
	notDelivered:
		'We could not send your message just now. Please try again in a few minutes, or email us directly and we will pick it up.'
} as const;
