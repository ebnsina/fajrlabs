<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import { reveal } from '#lib/motion.js';
	import { publishedPosts } from '#lib/content/posts.js';
	import { formatDate, isoDate } from '#lib/utils/format.js';
</script>

<Seo
	title="Writing"
	description="Occasional notes on building software honestly — what we turn down, what we would talk you out of, and what we have learned doing it."
/>

<PageHeader
	eyebrow="Writing"
	title="Notes, when we have something worth saying."
	standfirst="Four useful pieces a year beats something forgettable every week."
/>

<Section label={publishedPosts.length ? 'All pieces' : 'Coming soon'} labelAlign="display">
	{#if publishedPosts.length}
		<ul class="posts" {@attach reveal()}>
			{#each publishedPosts as post (post.slug)}
				<li>
					<a href="/writing/{post.slug}">
						<time datetime={isoDate(post.date)}>{formatDate(post.date)}</time>
						<h2>{post.title}</h2>
						<p>{post.summary}</p>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="empty" {@attach reveal()}>
			<h2>Nothing published just yet.</h2>
			<p>
				The first pieces are being written. Until then, the standard and the process pages are the
				fullest picture of how we work.
			</p>
			<div class="links">
				<a href="/halal-by-design">Our standard</a>
				<a href="/process">How we work</a>
			</div>
		</div>
	{/if}
</Section>

<CtaBand />

<style>
	.posts {
		margin: 0;
		padding: 0;
		list-style: none;
		max-width: var(--measure);
	}

	.posts li {
		border-top: 1px solid var(--rule);
	}

	.posts li:first-child {
		border-top: none;
	}

	.posts li:first-child a {
		padding-top: 0;
	}

	.posts a {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 22px 0;
		transition: padding-inline var(--slow) var(--ease);
	}

	.posts a:hover,
	.posts a:focus-visible {
		padding-inline: 10px;
	}

	time {
		font-family: var(--font-mono);
		font-size: 11px;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.08em;
		color: var(--faint);
	}

	.posts h2 {
		margin: 0;
		font-size: clamp(20px, 2.6vw, 26px);
		font-stretch: 91%;
		letter-spacing: -0.022em;
		line-height: 1.14;
	}

	.posts p {
		margin: 0;
		font-size: 14.5px;
		color: var(--muted);
	}

	.empty {
		max-width: var(--measure);
	}

	.empty h2 {
		margin: 0;
		font-size: clamp(22px, 2.8vw, 30px);
		font-stretch: 90%;
		letter-spacing: -0.024em;
	}

	.empty p {
		margin: 14px 0 0;
		color: var(--muted);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 22px;
		margin-top: 24px;
	}

	.links a {
		padding-bottom: 3px;
		border-bottom: 1px solid var(--rule-strong);
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		transition: border-color var(--fast) var(--ease);
	}

	.links a:hover,
	.links a:focus-visible {
		border-color: var(--ink);
	}

	@media (prefers-reduced-motion: reduce) {
		.posts a:hover,
		.posts a:focus-visible {
			padding-inline: 0;
		}
	}
</style>
