export type Post = {
	slug: string;
	title: string;
	summary: string;
	/** ISO date. Only used once `draft` is false. */
	date: string;
	draft: boolean;
	body: string[];
};

/**
 * Drafts do not appear on the site. Set `draft: false` and put a real date on a
 * piece once you are happy with it, and it publishes itself.
 */
export const posts: Post[] = [
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
