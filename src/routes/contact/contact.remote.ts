import { form } from '$app/server';
import { enquirySchema } from '#lib/schemas/enquiry.js';
import { enquiryMessages } from '#lib/messages.js';
import { sendEnquiry } from '#lib/server/email.js';

export type EnquiryResult = { ok: boolean; message: string };

/**
 * The only place an enquiry outcome is decided. Field-level problems come from
 * the shared schema; anything else becomes one friendly sentence here.
 */
export const submitEnquiry = form(enquirySchema, async (data): Promise<EnquiryResult> => {
	// Spam bots fill every field they find; people never see this one.
	if (data.website) return { ok: true, message: enquiryMessages.sent };

	try {
		await sendEnquiry(data);
		return { ok: true, message: enquiryMessages.sent };
	} catch (error) {
		console.error('Could not deliver an enquiry', error);
		return { ok: false, message: enquiryMessages.notDelivered };
	}
});
