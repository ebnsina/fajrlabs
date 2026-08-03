export type ChangelogEntry = {
	version: string;
	date: string;
	summary: string;
	changes: { kind: 'Added' | 'Changed' | 'Fixed' | 'Removed'; note: string }[];
};

/** Newest first. Mirrors CHANGELOG.md — keep the two in step. */
export const changelog: ChangelogEntry[] = [
	{
		version: '0.10.0',
		date: '2026-08-02',
		summary: 'The design system is a file an agent can read.',
		changes: [
			{
				kind: 'Changed',
				note: 'The design page now copies a DESIGN.md, the format Google Labs published'
			},
			{
				kind: 'Added',
				note: 'Elevation, shapes, and a do and do-not list, which were never written down'
			},
			{ kind: 'Fixed', note: 'The motion rules described a failsafe that no longer exists' }
		]
	},
	{
		version: '0.9.0',
		date: '2026-08-02',
		summary: 'Light and dark now open from the switch.',
		changes: [
			{
				kind: 'Added',
				note: 'Changing appearance sweeps out from the button as a circle, rather than snapping'
			},
			{ kind: 'Added', note: 'A short fade between pages, back again and without the flicker' }
		]
	},
	{
		version: '0.8.1',
		date: '2026-08-02',
		summary: 'No more flicker when you move between pages.',
		changes: [{ kind: 'Fixed', note: 'Pages flashed as they loaded, most visibly on iPhone' }]
	},
	{
		version: '0.8.0',
		date: '2026-08-02',
		summary: 'Writing, with the first two pieces.',
		changes: [
			{ kind: 'Added', note: 'Why this studio exists — what a written-down standard is for' },
			{ kind: 'Added', note: 'What we do differently, and what it costs' },
			{ kind: 'Changed', note: 'Writing is a grid of cards, each with artwork of its own' },
			{ kind: 'Fixed', note: 'An open question showed a tilted cross. It now shows a minus' },
			{ kind: 'Changed', note: 'Writing is in the main menu now that there is something to read' }
		]
	},
	{
		version: '0.7.6',
		date: '2026-08-02',
		summary: 'Easier to reach us, in more languages.',
		changes: [
			{ kind: 'Added', note: 'The WhatsApp number in the details on About' },
			{ kind: 'Changed', note: 'Languages now invites you to ask, rather than reading as a limit' },
			{
				kind: 'Added',
				note: 'WhatsApp where search engines and language models can read it, so they can pass it on'
			},
			{
				kind: 'Fixed',
				note: 'Tapping the WhatsApp number on an iPhone offered to call it. It opens WhatsApp'
			}
		]
	},
	{
		version: '0.7.5',
		date: '2026-08-02',
		summary: 'Pictures of Safar running.',
		changes: [
			{
				kind: 'Added',
				note: 'Screenshots on the Safar case study, captioned with what each one shows'
			},
			{
				kind: 'Changed',
				note: 'A case study now shares its own picture when linked, not the studio card'
			}
		]
	},
	{
		version: '0.7.4',
		date: '2026-08-02',
		summary: 'Safar is open to try.',
		changes: [{ kind: 'Added', note: 'A link to Safar, so you can use it yourself' }]
	},
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
		changes: [{ kind: 'Added', note: 'Why Fajr — what the word means and why we chose it' }]
	},
	{
		version: '0.5.1',
		date: '2026-08-01',
		summary: 'Corrected how we work with people.',
		changes: [{ kind: 'Changed', note: 'Ongoing support covers the work we built ourselves' }]
	},
	{
		version: '0.4.0',
		date: '2026-08-01',
		summary: 'A wordmark that greets you in Arabic.',
		changes: [{ kind: 'Added', note: 'Hover the name and it turns to فَجْر — dawn' }]
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
			}
		]
	}
];
