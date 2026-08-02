export type CaseStudy = {
	slug: string;
	name: string;
	/** Shown wherever the project is listed. */
	oneLine: string;
	/** Stated plainly so nothing here can be mistaken for delivered client work. */
	status: string;
	sector: string;
	/** Public URL, when there is something to look at. */
	url?: string;
	/** Screenshots of the thing running. Captions say what the picture proves. */
	shots?: { src: string; width: number; height: number; alt: string; caption: string }[];
	problem: string[];
	decisions: { title: string; detail: string }[];
	standing: string;
};

export const caseStudies: CaseStudy[] = [
	{
		slug: 'safar',
		name: 'Safar',
		oneLine: 'Buses, trains and flights across Bangladesh, in one search.',
		status: 'Our own product, in development',
		sector: 'Travel booking',
		url: 'https://safar7.vercel.app',
		shots: [
			{
				src: '/case-studies/safar-search.jpg',
				width: 1440,
				height: 757,
				alt: 'Safar search results for Dhaka to Cox’s Bazar: sixteen journeys listed with operator, departure and arrival times, duration, fare and seats left.',
				caption:
					'One search, sixteen journeys. Each row carries the operator, both times, how long it takes, the fare and the seats left — so the comparison happens in the list, not in your head.'
			},
			{
				src: '/case-studies/safar-seats.jpg',
				width: 1440,
				height: 757,
				alt: 'A Safar trip page with seat 2A chosen. The panel shows fares ৳1,151, booking fee ৳29, total ৳1,180, and the line “seats held ten minutes”.',
				caption:
					'The fee is on the screen next to the fare, not revealed at the end. Underneath, the seat is held for ten minutes while you fill the form in.'
			}
		],
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
			'You can open Safar and use it, but it is not a real service. The timetables are generated rather than taken from operators, and nothing booked through it will carry you anywhere. What is there is the whole path — search, compare, choose a seat, check out, get a reference — working end to end, which is the part worth proving. We are building it because it is the kind of everyday problem we like: unglamorous, widely felt, and mostly a matter of refusing to do the annoying things other services do.'
	}
];

export function findCaseStudy(slug: string): CaseStudy | undefined {
	return caseStudies.find((item) => item.slug === slug);
}
