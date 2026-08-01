export type Engagement = {
	name: string;
	bestFor: string;
	summary: string;
	includes: string[];
	commitment: string;
	billing: string;
};

export const engagements = {
	standfirst:
		'Three ways to work with us. We will tell you which one fits, including when it is the smallest.',
	options: [
		{
			name: 'A project, fixed price',
			bestFor: 'You know what you need',
			summary:
				'Scope and price agreed before we start. Neither moves. Most of our work is this, because it puts the risk on us instead of you.',
			includes: [
				'A written plan you approve first',
				'Something to look at every week or two',
				'Testing, launch and training',
				'Thirty days of fixes after launch'
			],
			commitment: 'Six to sixteen weeks.',
			billing: 'A few payments across the project. No surprise at the end.'
		},
		{
			name: 'Ongoing support',
			bestFor: 'Something is already live',
			summary:
				'A set number of days each month for fixes and improvements. Unused days roll over once, so a quiet month is not wasted money.',
			includes: [
				'A named person who knows your system',
				'Agreed response times for anything urgent',
				'Small improvements as you think of them',
				'A short written summary each month'
			],
			commitment: 'Monthly. Thirty days’ notice to stop.',
			billing: 'A flat monthly fee, agreed up front.'
		},
		{
			name: 'Alongside your team',
			bestFor: 'You have developers',
			summary:
				'We join your team, use your tools, follow your standards. For when you are short-handed for a stretch and would rather not hire for it.',
			includes: [
				'Full-time or part-time',
				'Your hours, your meetings',
				'Your standards and your review process',
				'A clean exit whenever you are done'
			],
			commitment: 'A month at a time, usually three or more.',
			billing: 'A day rate, invoiced monthly for days used.'
		}
	] satisfies Engagement[],
	pricingNote:
		'A rate without a scope is a meaningless number, and it usually turns into a surprise. So we do not publish one. You get a real figure within a week of the first call, and we stick to it.',
	notRightNote:
		'If none of these fit, say so on the form. We would rather point you somewhere better than sell you the wrong arrangement.'
} as const;
