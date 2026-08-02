export type Faq = { question: string; answer: string };

export const faqGroups: { heading: string; items: Faq[] }[] = [
	{
		heading: 'Our standard',
		items: [
			{
				question: 'What does “halal by design” mean for my project?',
				answer:
					'We have written down the work we will not take, and every enquiry is checked against it before we quote. For most projects it changes nothing except that you know where we stand.'
			},
			{
				question: 'Do I have to be Muslim to work with you?',
				answer:
					'No. You do not have to share our beliefs to work with us. What you get either way is a studio that tells you the truth.'
			},
			{
				question: 'Most of my product is fine. One part might not be.',
				answer:
					'Tell us early. There is usually a way to build what you need without the part that worries us, and if there is not, you will hear so plainly.'
			},
			{
				question: 'Would you turn down a large budget?',
				answer: 'Yes. It is the reason the studio exists.'
			}
		]
	},
	{
		heading: 'Money and timing',
		items: [
			{
				question: 'What will it cost?',
				answer:
					'It depends on what you need, and a price list would only pretend otherwise. You get a fixed number within a week of the first call, and we stick to it.'
			},
			{
				question: 'Why not publish your rates?',
				answer:
					'A rate without a scope is a meaningless number that turns into a surprise later. Half an hour on a call gets you a figure you can rely on.'
			},
			{
				question: 'How long will it take?',
				answer:
					'A plugin, two to five weeks. Custom software, six to twelve. A mobile app, eight to sixteen including store review. Real dates go in the written plan.'
			},
			{
				question: 'What if it changes halfway through?',
				answer:
					'Normal, and we plan for it. Anything new is priced and agreed before it starts, so the bill never grows without your say-so.'
			}
		]
	},
	{
		heading: 'Working with us',
		items: [
			{
				question: 'Who owns what you build?',
				answer:
					'You do — code, designs and accounts, and it is in the agreement. Nothing is held back to keep you tied to us.'
			},
			{
				question: 'What happens after launch?',
				answer:
					'Thirty days of fixes are included. After that, your team takes it on with proper documentation from us, or we look after it monthly — your choice.'
			},
			{
				question: 'Does the time difference matter?',
				answer:
					'We work remotely and keep hours that overlap your day for calls. Everything else is written down, so nobody waits on a conversation.'
			},
			{
				question: 'Will you sign a confidentiality agreement?',
				answer: 'Yes, before you tell us anything sensitive. Send us yours or ask for ours.'
			},
			{
				question: 'How much of my time will this take?',
				answer:
					'About half an hour a week. Less than that and the work starts drifting from what you wanted.'
			}
		]
	}
];
