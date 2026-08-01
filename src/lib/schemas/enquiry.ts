import * as v from 'valibot';
import { services } from '#lib/content/services.js';

/** Shared by the server handler and the browser, so both agree on what is valid. */
export const enquiryOptions = [
	...services.map((service) => ({ value: service.slug, label: service.name })),
	{ value: 'not-sure', label: 'Not sure yet' }
];

const optionValues = enquiryOptions.map((option) => option.value) as [string, ...string[]];

export const enquirySchema = v.object({
	name: v.pipe(
		v.string(),
		v.trim(),
		v.nonEmpty('Please tell us your name.'),
		v.maxLength(80, 'That name is longer than we can store — please shorten it.')
	),
	email: v.pipe(
		v.string(),
		v.trim(),
		v.nonEmpty('Please add an email address so we can reply.'),
		v.email('That does not look like an email address. Please check it.'),
		v.maxLength(160, 'That email address is longer than we can store.')
	),
	organisation: v.pipe(
		v.string(),
		v.trim(),
		v.maxLength(120, 'Please shorten the organisation name.')
	),
	service: v.picklist(optionValues, 'Please choose one of the options.'),
	message: v.pipe(
		v.string(),
		v.trim(),
		v.nonEmpty('Please tell us a little about the project.'),
		v.minLength(20, 'A sentence or two more would help us give you a useful answer.'),
		v.maxLength(4000, 'That is longer than the form can take — please trim it a little.')
	),
	// Hidden from people, tempting to automated spam. Real visitors leave it empty.
	website: v.optional(v.string(), '')
});

export type Enquiry = v.InferOutput<typeof enquirySchema>;

export function serviceLabel(value: string): string {
	return enquiryOptions.find((option) => option.value === value)?.label ?? value;
}
