export type WorkItem = {
	slug: string;
	name: string;
	/** Shown wherever the project is listed. */
	oneLine: string;
	/** Stated plainly so nothing here can be mistaken for delivered client work. */
	status: string;
	sector: string;
	problem: string[];
	decisions: { title: string; detail: string }[];
	standing: string;
};

export const work: WorkItem[] = [
	{
		slug: 'safar',
		name: 'Safar',
		oneLine: 'Buses, trains and flights across Bangladesh, in one search.',
		status: 'Our own product, in development',
		sector: 'Travel booking',
		problem: [
			'Booking a journey across Bangladesh means visiting three different kinds of website. Bus operators sell their own seats. The railway sells its own. Airlines sell theirs. Nobody shows you all three side by side, so working out whether to take the overnight coach or the morning flight means opening half a dozen tabs and doing the comparison in your head.',
			'The second problem is the price. The number that gets you to click is rarely the number you pay. Fees appear at the last step, once you have spent ten minutes entering passenger details and feel committed.',
			'The third is the seat. You pick one, work through the form, and find at the end that somebody else took it while you were typing. On some services you only discover the clash after paying.'
		],
		decisions: [
			{
				title: 'One search, all three ways of travelling',
				detail:
					'You give a place, a destination and a date once. Coaches, trains and flights come back together, so the choice between them is a glance rather than an exercise.'
			},
			{
				title: 'The price you first see is the price you pay',
				detail:
					'Fees are worked into the total from the very first result. Nothing is added later. If a journey costs more than another, you can see that at the moment of comparison, which is the only moment it is useful.'
			},
			{
				title: 'Your seat is held while you pay',
				detail:
					'Choosing a seat holds it for a set window, so it cannot be sold from under you while you fill in the form. If someone genuinely got there first, you are told so immediately and asked to pick again — not after taking your money.'
			},
			{
				title: 'No account to make a booking',
				detail:
					'Requiring people to register before they can buy is a tax on the anxious and the hurried. A booking is found later with its reference and the email it was made with, which is what people actually have to hand.'
			},
			{
				title: 'Every failure says what to do next',
				detail:
					'There is one list of everything that can go wrong, and each entry is a single plain sentence naming the problem and the next step. No codes, no apologies, no dead ends. "Someone booked those seats first — choose different ones to continue" is the whole message.'
			}
		],
		standing:
			'Safar is not live. It runs on generated timetables rather than real operators, and no seat sold through it would carry you anywhere yet. We are building it because it is the kind of everyday problem we like: unglamorous, widely felt, and mostly a matter of refusing to do the annoying things other services do.'
	}
];

export function findWork(slug: string): WorkItem | undefined {
	return work.find((item) => item.slug === slug);
}
