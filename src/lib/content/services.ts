export type Service = {
	slug: string;
	name: string;
	oneLine: string;
	lead: string;
	delivers: string[];
	suitedTo: string[];
	timeline: string;
	/** Compact form for list rows, set in Geist Mono. */
	duration: string;
	closing: string;
};

export const services: Service[] = [
	{
		slug: 'custom-software',
		name: 'Custom software',
		oneLine: 'Built around how you work, not the reverse.',
		lead: 'Your business does not run like anyone else’s. Your software should not either. We learn how you actually work, then build the tool that fits.',
		delivers: [
			'Something in use on day one, not a demo',
			'The screens the people doing the work asked for',
			'Joined up with what you already pay for',
			'Instructions a new starter can follow'
		],
		suitedTo: [
			'Spreadsheets that keep breaking',
			'Work that passes through several hands',
			'Reports someone rebuilds every week',
			'A process nobody sells software for'
		],
		timeline: 'Six to twelve weeks to a version people are using.',
		duration: '6–12 wks',
		closing: 'We start where it hurts most. Useful early beats impressive late.'
	},
	{
		slug: 'mobile-apps',
		name: 'Mobile apps',
		oneLine: 'Both stores. Still working after the next update.',
		lead: 'An app is not finished when it looks right. It is finished when it is in the stores, people use it, and it survives the next phone update. We take it that far, then keep it there.',
		delivers: [
			'One app, properly built for iPhone and Android',
			'Store listings and review handled by us',
			'An update plan, so it does not quietly rot',
			'Sensible behaviour on a bad signal'
		],
		suitedTo: [
			'A service people would use more on a phone',
			'Staff who work away from a desk',
			'An app left alone too long',
			'A first version you want in real hands'
		],
		timeline: 'Eight to sixteen weeks, store review included.',
		duration: '8–16 wks',
		closing: 'If a website would serve you better, we will say so. It often would.'
	},
	{
		slug: 'custom-plugins',
		name: 'Custom plugins',
		oneLine: 'The missing piece, added to what you already run.',
		lead: 'Your system does almost everything. We build the part it does not — inside the tool your team already opens. No replacement, no fourth subscription.',
		delivers: [
			'The feature, where your team already works',
			'No new logins, no extra place to check',
			'Built to survive the next update',
			'Easy to switch off if you change your mind'
		],
		suitedTo: [
			'A system that does everything but one thing',
			'Several tools doing one job between them',
			'Copying the same data across by hand',
			'A workaround your team has lived with for years'
		],
		timeline: 'Two to five weeks.',
		duration: '2–5 wks',
		closing: 'Small, sharply priced, and usually the fastest win on the board.'
	},
	{
		slug: 'ai-automations',
		name: 'AI automations',
		oneLine: 'The dull work handled. A person still in charge.',
		lead: 'A lot of nonsense is spoken about AI. Our position is plain. It is very good at the repetitive parts of a job. It should never decide something about a person on its own.',
		delivers: [
			'The repetitive part done — sorting, summarising, drafting',
			'A person who approves anything that matters',
			'A record of what happened, and why',
			'An honest list of what is not worth automating'
		],
		suitedTo: [
			'The same document, over and over',
			'Support messages that need sorting first',
			'Reports assembled by hand from five places',
			'A backlog growing faster than the team'
		],
		timeline: 'Three to eight weeks, starting with your worst time sink.',
		duration: '3–8 wks',
		closing: 'We measure the hours it saves. If it saves none, we say so.'
	}
];

export function findService(slug: string): Service | undefined {
	return services.find((service) => service.slug === slug);
}
