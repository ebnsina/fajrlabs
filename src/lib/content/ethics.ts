export type Position = { title: string; note: string };

export const ethics = {
	title: 'Halal by design',
	standfirst:
		'Most studios build whatever is paid for. We do not. Here is exactly where the line sits.',
	intro: [
		'Ethics come before the brief and before the budget. It is a standard we hold ourselves to as Muslims, and every enquiry meets it — including the well-funded ones, and the ones we would love to take.',
		'You do not have to share our beliefs to work with us. Many clients do not. You get a studio that tells you the truth, and never puts your project next to something that would embarrass you.'
	],
	accept: [
		{
			title: 'Trade, operations and logistics',
			note: 'Honest buying and selling, and the systems behind it.'
		},
		{ title: 'Health, education and public services', note: 'Work that leaves people better off.' },
		{ title: 'Finance without interest', note: 'Structured properly, not bolted on afterwards.' },
		{ title: 'Charities and community organisations', note: 'Smallest budgets, clearest purpose.' },
		{
			title: 'Anything you would explain to your family',
			note: 'A reliable test. We apply it to ourselves.'
		}
	] satisfies Position[],
	decline: [
		{
			title: 'Adult and 18+ material',
			note: 'We do not build it, host it, advertise it or connect to it. That includes work that looks respectable but exists to feed it.'
		},
		{
			title: 'Gambling and betting',
			note: 'Lotteries, prize draws dressed as games, and the chance-based rewards inside some apps.'
		},
		{
			title: 'Lending built on interest',
			note: 'Buy-now-pay-later included, and short-term credit aimed at people already struggling.'
		},
		{ title: 'Alcohol and tobacco', note: 'Selling it, promoting it, or moving it.' },
		{
			title: 'Designs meant to trip people up',
			note: 'Hidden charges, resetting countdowns, subscriptions that are easy to start and hard to leave.'
		},
		{
			title: 'Anything that fakes a real person',
			note: 'Invented reviews, false endorsements, impersonation.'
		}
	] satisfies Position[],
	howWeCheck: [
		{
			step: 'You tell us what it does',
			detail: 'What it does and who pays for it. Usually that is enough for both of us.'
		},
		{
			step: 'You get an answer in a day',
			detail: 'If it is not for us, you hear so quickly — with the reason, and a name to try next.'
		},
		{
			step: 'It goes in the contract',
			detail: 'Scope and standard, both written down. That protects both of us.'
		},
		{
			step: 'It still applies later',
			detail:
				'If a project turns into something we cannot build, we say so early and hand over cleanly.'
		}
	],
	/*
	 * Where the standard comes from. Both texts speak to the same point: helping
	 * something happen carries the same weight as doing it yourself.
	 */
	sources: [
		{
			arabic:
				'وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ',
			translation:
				'Help one another to righteousness and mindfulness of God, and do not help one another to sin and transgression.',
			reference: 'Qur’an — Surah Al-Ma’idah 5:2',
			why: 'Building a thing is helping it exist. That is the whole basis of our standard.'
		},
		{
			arabic:
				'لَعَنَ رَسُولُ اللَّهِ ﷺ آكِلَ الرِّبَا وَمُوكِلَهُ وَكَاتِبَهُ وَشَاهِدَيْهِ وَقَالَ هُمْ سَوَاءٌ',
			translation:
				'The Messenger of God ﷺ cursed the one who consumes interest, the one who pays it, the one who records it, and the two who witness it — and he said: they are all the same.',
			reference: 'Hadith — Sahih Muslim 1598, narrated by Jabir ibn Abdullah',
			why: 'The scribe and the witness are named alongside the parties. In our trade, we are the scribe.'
		}
	],
	sourcesNote:
		'We are not scholars, and this page is not a fatwa. It is the reasoning behind how we choose our work. Where a project raises a question we cannot answer, we ask someone qualified before we quote.',
	closing:
		'We would rather lose a project than take one we are uneasy about. It has cost us work. We would choose the same again.'
} as const;
