<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import { reveal } from '#lib/motion.js';
	import Aurora from '#lib/components/Aurora.svelte';
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
						<span class="art"><Aurora seed={post.slug} /></span>
						<span class="text">
							<time datetime={isoDate(post.date)}>{formatDate(post.date)}</time>
							<h2>{post.title}</h2>
							<p>{post.summary}</p>
						</span>
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
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 44px 36px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@media (min-width: 760px) {
		.posts {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.posts a {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	/* The art lifts on hover. No border and no background change — the picture is
	   already the edge, so anything else would be marking the same one twice. */
	.art {
		display: block;
		overflow: hidden;
		transition: transform var(--slow) var(--ease);
	}

	.posts a:hover .art,
	.posts a:focus-visible .art {
		transform: translateY(-6px);
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: 6px;
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
		max-width: 22ch;
		font-size: clamp(19px, 2.1vw, 23px);
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
		.posts a:hover .art,
		.posts a:focus-visible .art {
			transform: none;
		}
	}
</style>
