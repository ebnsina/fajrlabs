export type ChangelogEntry = {
	version: string;
	date: string;
	summary: string;
	changes: { kind: 'Added' | 'Changed' | 'Fixed' | 'Removed'; note: string }[];
};

/** Newest first. Mirrors CHANGELOG.md — keep the two in step. */
export const changelog: ChangelogEntry[] = [
	{
		version: '0.1.0',
		date: '2026-08-01',
		summary: 'First public version of the site.',
		changes: [
			{ kind: 'Added', note: 'Home, services, process, working together, about and contact pages' },
			{ kind: 'Added', note: 'The Halal by design standard, published in full' },
			{ kind: 'Added', note: 'Common questions, writing and this changelog' },
			{ kind: 'Added', note: 'Enquiry form with checks as you type and email delivery' },
			{ kind: 'Added', note: 'Light and dark appearance, following your device by default' },
			{ kind: 'Added', note: 'Friendly pages for missing pages and unexpected problems' },
			{
				kind: 'Added',
				note: 'The Qur’an and hadith our standard rests on, quoted with references'
			},
			{ kind: 'Changed', note: 'Fewer dividing lines, and columns that line up across the page' },
			{ kind: 'Changed', note: 'Shorter, sharper writing throughout' }
		]
	}
];
