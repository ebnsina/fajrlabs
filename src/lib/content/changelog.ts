export type ChangelogEntry = {
	version: string;
	date: string;
	summary: string;
	changes: { kind: 'Added' | 'Changed' | 'Fixed' | 'Removed'; note: string }[];
};

/** Newest first. Mirrors CHANGELOG.md — keep the two in step. */
export const changelog: ChangelogEntry[] = [
	{
		version: '0.7.0',
		date: '2026-08-02',
		summary: 'Showing what we are building.',
		changes: [{ kind: 'Added', note: 'Case studies, starting with Safar' }]
	},
	{
		version: '0.6.0',
		date: '2026-08-01',
		summary: 'What the name means, and how the site is built.',
		changes: [
			{ kind: 'Added', note: 'Why Fajr — what the word means and why we chose it' },
			{ kind: 'Added', note: 'A reference page describing how this site is designed' }
		]
	},
	{
		version: '0.5.1',
		date: '2026-08-01',
		summary: 'Corrected how we work with people.',
		changes: [
			{ kind: 'Removed', note: 'We do not join other teams, so that option is gone' },
			{ kind: 'Changed', note: 'Ongoing support covers the work we built ourselves' }
		]
	},
	{
		version: '0.4.0',
		date: '2026-08-01',
		summary: 'A wordmark that greets you in Arabic.',
		changes: [
			{ kind: 'Added', note: 'Hover the name and it turns to فَجْر — dawn' },
			{ kind: 'Fixed', note: 'The header no longer lets the page show through it' }
		]
	},
	{
		version: '0.3.0',
		date: '2026-08-01',
		summary: 'Moved to a new host.',
		changes: [{ kind: 'Changed', note: 'The site now runs on Vercel' }]
	},
	{
		version: '0.2.0',
		date: '2026-08-01',
		summary: 'Movement, without making you wait for it.',
		changes: [
			{ kind: 'Added', note: 'Headings and sections that reveal as you scroll' },
			{ kind: 'Added', note: 'A cursor that responds to what it is over' },
			{ kind: 'Changed', note: 'Animation loads separately, so the page appears just as fast' },
			{
				kind: 'Changed',
				note: 'Movement is reduced or switched off on slower connections and devices'
			}
		]
	},
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
