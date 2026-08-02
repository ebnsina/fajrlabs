/**
 * Every brand fact lives here. These are placeholders — change them once and
 * they update across the whole site, including page titles and social previews.
 */
export const site = {
	name: 'Fajr Labs',
	shortName: 'Fajr Labs',
	/** Set in two weights: Fajr carries the meaning, Labs sits back. */
	wordmark: { strong: 'Fajr', soft: 'Labs' },
	/** Shown on hover in place of the wordmark. Fajr — dawn, and the dawn prayer. */
	arabicName: 'فَجْر',
	tagline: 'Software studio · Halal by design',
	url: 'https://fajrlabs.io',
	email: 'salam@fajrlabs.io',
	/** Messaging only. Deliberately no `tel:` form anywhere — it is not a phone line. */
	whatsapp: { display: '+880 1841 252123', href: 'https://wa.me/8801841252123' },
	location: 'Remote — Europe, the Gulf and South Asia',
	founded: '2024',
	description:
		'Custom software, mobile apps, plugins and practical AI automation. Built to a standard we publish, not one we claim.'
} as const;

/*
 * In the order a buyer asks the questions: what do you do, show me, what is
 * different, how does it work, what do you think, who are you. Writing sits
 * before About because it is the argument, and About is the answer to it.
 */
export const nav = [
	{ href: '/services', label: 'Services' },
	{ href: '/case-studies', label: 'Case studies' },
	{ href: '/halal-by-design', label: 'Halal by design' },
	{ href: '/process', label: 'Process' },
	{ href: '/writing', label: 'Writing' },
	{ href: '/about', label: 'About' }
] as const;

export const footerNav = [
	{
		heading: 'Studio',
		links: [
			{ href: '/about', label: 'About' },
			{ href: '/case-studies', label: 'Case studies' },
			{ href: '/process', label: 'How we work' },
			{ href: '/engagements', label: 'Working together' },
			{ href: '/changelog', label: 'Changelog' }
		]
	},
	{
		heading: 'Answers',
		links: [
			{ href: '/halal-by-design', label: 'Halal by design' },
			{ href: '/faq', label: 'Common questions' },
			{ href: '/writing', label: 'Writing' },
			{ href: '/contact', label: 'Start a project' }
		]
	}
] as const;
