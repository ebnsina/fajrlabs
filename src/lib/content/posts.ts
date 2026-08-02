/** A paragraph, or a subheading to break a longer piece into parts. */
export type PostBlock = string | { heading: string };

export type Post = {
	slug: string;
	title: string;
	summary: string;
	/** ISO date. Only used once `draft` is false. */
	date: string;
	draft: boolean;
	body: PostBlock[];
};

/**
 * Drafts do not appear on the site. Set `draft: false` and put a real date on a
 * piece once you are happy with it, and it publishes itself.
 */
export const posts: Post[] = [
	{
		slug: 'why-this-studio-exists',
		title: 'Why this studio exists',
		summary:
			'Most studios have a line they will not cross. Very few write it down, which is exactly how a line quietly moves.',
		date: '2026-08-02',
		draft: false,
		body: [
			'Software gets built for whoever pays for it. That is the default nearly everywhere, and almost nobody says it out loud.',
			'Most studios do have a line. Ask privately and you will hear about the job someone walked away from. But the line usually lives in a person’s head, and a line kept in someone’s head moves. A little for a large budget. A little more in a quiet month. Eventually it sits wherever it needs to sit.',
			'So we wrote ours down first. Before deciding what this studio would build, we decided what it would not.',
			{ heading: 'The order is the whole point' },
			'A standard set in advance costs you work you can name. A standard set in the moment, with the money already on the table and a good reason to make an exception, is not a standard at all — it is a preference.',
			'That is why the list is public rather than internal. Adult material. Gambling. Lending built on interest. Alcohol and tobacco. Designs meant to trip people up. Anything that fakes a real person. It is written out in full on a page you can read before you ever speak to us, and it goes into the contract when we start, so it binds us instead of flattering us.',
			{ heading: 'You do not have to share it' },
			'It is a standard we hold as Muslims. It is not a condition of working with us, and we are not asking anyone to agree with it.',
			'What a published standard tells you is simpler than agreement: that we will say no to a paying customer. That is a useful thing to know about anyone before you hire them. A studio that will not refuse work has nothing to tell you when it says yes.',
			{ heading: 'The ordinary version of this' },
			'None of it is meant to be unusual. The aim is the opposite — for it to be ordinary. A software business should be able to state plainly what it will not build and still be a normal business, with normal clients and normal work.',
			'It will cost us work. We would decide the same again.'
		]
	},
	{
		slug: 'what-we-do-differently',
		title: 'What we do differently, and what it costs',
		summary:
			'Careful, honest, partnership — every studio’s website says the same words. Here is what is actually different, and the price of each one.',
		date: '2026-08-02',
		draft: false,
		body: [
			'Every studio’s website promises the same things, in the same words. Careful. Honest. A partnership, not a supplier. The words cost nothing to write, which is roughly what they are worth.',
			'So here is what is actually different here, put in a way you could hold us to.',
			{ heading: 'The standard is published, not private' },
			'Ours is on a page, in full, before you call. You can read exactly what we refuse and decide whether we are worth your time. It goes into the contract as well, which is the difference between a value and a commitment.',
			{ heading: 'A no arrives quickly, with a reason' },
			'If a project is not for us, you hear so fast — with why, and a suggestion of who to ask instead. A slow no is the most expensive thing a studio can hand you. It costs you weeks you could have spent talking to someone who would have said yes.',
			{ heading: 'A fixed price, agreed before anything starts' },
			'One number, settled before work begins. If it takes us longer than we thought, that is our problem to absorb. An estimate that drifts moves the risk onto the person who understands the work least, which is the wrong way round.',
			{ heading: 'Plain language, the whole way through' },
			'No jargon, no stack talk, nothing you have to nod along to. If we cannot explain a decision in words you already use, we do not understand it well enough yet — and that is our failing to fix, not yours to sit through.',
			{ heading: 'Small on purpose' },
			'The people you meet are the people who build it. There is no handover from a confident salesperson to a stranger who was not in the room, because there is no salesperson.',
			{ heading: 'We will talk you out of things' },
			'Sometimes the useful answer is that you do not need what you came to buy, or need a much smaller version of it. Small and finished beats large and nearly. It is far cheaper to hear that in the first conversation than two months in.',
			{ heading: 'What it costs' },
			'None of this is free. Publishing the standard turns work away before it ever reaches us. Fixing the price means we carry every estimate we get wrong. Talking someone out of a large build costs us the large build.',
			'We would rather be plain about that than pretend there is a version of this with no price attached. What you get in return is a studio whose answers do not change with the size of the cheque.'
		]
	},
	{
		slug: 'what-we-turn-down-and-why',
		title: 'What we turn down, and why we say so out loud',
		summary: 'Publishing the work you refuse looks like a way to lose clients. It is not.',
		date: '2026-01-01',
		draft: true,
		body: [
			'Most studios have a line somewhere. Very few write it down, because writing it down feels like turning business away in advance.',
			'The opposite happened. Say it up front and the enquiries come from people who already agree. The first call starts somewhere useful instead of circling.'
		]
	},
	{
		slug: 'you-probably-do-not-need-an-app',
		title: 'You probably do not need an app',
		summary:
			'Sometimes the most useful thing we do on a first call is talk someone out of what they came to buy.',
		date: '2026-01-01',
		draft: true,
		body: [
			'An app is a serious commitment. Two shops to satisfy, two sets of rules that change without asking you, and a maintenance bill that never stops.',
			'Plenty of businesses that ask for an app are better served by a website that works properly on a phone. We would rather say that in the first half hour than eight weeks in.'
		]
	}
];

export const publishedPosts = posts
	.filter((post) => !post.draft)
	.sort((a, b) => b.date.localeCompare(a.date));

export function findPublishedPost(slug: string): Post | undefined {
	return publishedPosts.find((post) => post.slug === slug);
}
