<script lang="ts">
	import { HugeiconsIcon, ArrowLeft02Icon } from '#lib/icons.js';
	import Seo from '#lib/components/Seo.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import { formatDate, isoDate } from '#lib/utils/format.js';

	let { data } = $props();

	const post = $derived(data.post);
</script>

<Seo
	title={post.title}
	description={post.summary}
	type="article"
	publishedAt={isoDate(post.date)}
/>

<PageHeader eyebrow={formatDate(post.date)} title={post.title} standfirst={post.summary} />

<Section label="Article">
	<article>
		{#each post.body as paragraph (paragraph)}
			<p>{paragraph}</p>
		{/each}
		<p class="published">
			Published <time datetime={isoDate(post.date)}>{formatDate(post.date)}</time>
		</p>
	</article>

	<a class="back" href="/writing">
		<span class="icon" aria-hidden="true"
			><HugeiconsIcon icon={ArrowLeft02Icon} size={15} strokeWidth={2} /></span
		>
		All writing
	</a>
</Section>

<CtaBand />

<style>
	article {
		max-width: var(--measure);
	}

	article p {
		margin: 0 0 18px;
		font-size: 16.5px;
	}

	.published {
		margin-top: 28px;
		padding-top: 18px;
		border-top: 1px solid var(--rule);
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--faint);
	}

	.back {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		margin-top: 32px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted);
		transition: color var(--fast) var(--ease);
	}

	.back:hover,
	.back:focus-visible {
		color: var(--ink);
	}

	.icon {
		display: grid;
		place-items: center;
		transition: transform var(--fast) var(--ease);
	}

	.back:hover .icon,
	.back:focus-visible .icon {
		transform: translateX(-4px);
	}
</style>
