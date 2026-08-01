// All user-facing formatting goes through the Intl web APIs — no hand-rolled formatters.

export const LOCALE = 'en-GB';

const longDate = new Intl.DateTimeFormat(LOCALE, {
	day: 'numeric',
	month: 'long',
	year: 'numeric'
});

const shortDate = new Intl.DateTimeFormat(LOCALE, {
	day: '2-digit',
	month: 'short',
	year: 'numeric'
});

const listFormat = new Intl.ListFormat(LOCALE, { style: 'long', type: 'conjunction' });

/** Parses an ISO date string, throwing early rather than rendering "Invalid Date". */
function toDate(iso: string): Date {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) throw new Error(`Invalid date in content: "${iso}"`);
	return date;
}

export function formatDate(iso: string): string {
	return longDate.format(toDate(iso));
}

export function formatDateShort(iso: string): string {
	return shortDate.format(toDate(iso));
}

/** Machine-readable value for <time datetime="…">. */
export function isoDate(iso: string): string {
	return toDate(iso).toISOString().slice(0, 10);
}

export function formatList(items: readonly string[]): string {
	return listFormat.format(items);
}
