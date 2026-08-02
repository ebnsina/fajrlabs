export const about = {
	standfirst:
		'A software studio that decided what it would not build before it decided what it would.',
	intro: [
		'We build custom software, mobile apps, plugins and practical automation. Small on purpose, so the people you meet are the people who build it.',
		'One decision shaped the rest: write the standard down, then apply it to every enquiry rather than the convenient ones. It has cost us projects. We would decide the same again.'
	],
	/*
	 * Why the name. This explains what Fajr means and why it suits the studio —
	 * TODO: add your own reason for choosing it, which will always beat ours.
	 */
	name: {
		heading: 'Why Fajr',
		arabic: 'فَجْر',
		body: [
			'Fajr is the dawn, and the prayer that comes with it — the first of the day, prayed while it is still dark, before the sun has cleared the horizon.',
			'It is the hardest one to keep. Nobody sees you get up for it. There is no audience and no immediate reward, only the fact that you said you would. That is the whole idea behind how we work: the standard holds when it is inconvenient, or it was never a standard.',
			'It is also a beginning. Fajr is the moment the day is set, before anything has gone wrong. Good software works the same way — what you decide at the start, quietly, is what you live with later.'
		]
	},
	beliefs: [
		{
			title: 'Software should fit the business',
			note: 'If your team works around the tool, the tool is wrong.'
		},
		{
			title: 'Plain language is not dumbing down',
			note: 'If we cannot explain it without jargon, we do not understand it yet.'
		},
		{
			title: 'Small and finished beats large and nearly',
			note: 'Something useful in six weeks, not something impressive in a year.'
		},
		{
			title: 'The standard does not bend',
			note: 'Not for a deadline, a budget, or a client we would otherwise love.'
		}
	],
	how: [
		{ label: 'Size', value: 'Small on purpose. You work with the builders' },
		{ label: 'Where', value: 'Remote, with hours that overlap yours' },
		{ label: 'Languages', value: 'English and Bengali' },
		{ label: 'First reply', value: 'Within one working day' }
	]
} as const;
