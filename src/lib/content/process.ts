// A genuine sequence, which is why these steps are numbered.
export type Step = { title: string; summary: string; detail: string; yourPart: string };

export const process = {
	standfirst:
		'No mystery. No long silences. No invoice bigger than the estimate. This is how a project runs.',
	steps: [
		{
			title: 'A conversation',
			summary: 'Half an hour. Free.',
			detail:
				'You tell us what is going wrong. We say honestly whether we are the right people. Sometimes the answer is that you do not need custom software at all.',
			yourPart: 'Bring the problem, not a specification.'
		},
		{
			title: 'A written plan, a fixed price',
			summary: 'Within a week.',
			detail:
				'What we are building, what it costs, when it lands. The price only moves if you ask for something new, and that gets priced before anyone starts it.',
			yourPart: 'Read it properly. Challenge anything that looks wrong.'
		},
		{
			title: 'Building, in the open',
			summary: 'Something to click every week or two.',
			detail:
				'Working software on a schedule, not status reports. Changing your mind early is cheap. At the end it is not. This keeps you early.',
			yourPart: 'Half an hour a week to tell us what is off.'
		},
		{
			title: 'Into real hands',
			summary: 'In stages, carefully.',
			detail:
				'A small group first, then everyone. Your team is shown how it works and keeps the written instructions.',
			yourPart: 'Pick a few people who will try to break it.'
		},
		{
			title: 'Afterwards',
			summary: 'You are not left holding it.',
			detail:
				'Everything belongs to you, the code included. We either stay on to look after it or hand it over properly, with the documentation to match.',
			yourPart: 'Tell us which. Both are fine.'
		}
	] satisfies Step[],
	promises: [
		{
			title: 'Plain language, always',
			note: 'If you are only nodding along, say so. We will start again.'
		},
		{
			title: 'The price we said',
			note: 'Fixed stays fixed. Extra work is agreed before it starts.'
		},
		{ title: 'Your work is yours', note: 'Code, designs, accounts. Nothing held hostage.' },
		{
			title: 'Bad news early',
			note: 'If something slips, you hear it the day we know. Not at the end.'
		}
	]
} as const;
