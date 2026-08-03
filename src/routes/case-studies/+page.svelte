<script lang="ts">
	import { ArrowUpRight01Icon, HugeiconsIcon } from '#lib/icons.js';
	import Seo from '#lib/components/Seo.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import { reveal } from '#lib/motion.js';
	import { caseStudies } from '#lib/content/case-studies.js';
</script>

<Seo
	title="Case studies"
	description="What we are building, and the problems it exists to solve."
/>

<PageHeader
	eyebrow="Case studies"
	title="What we are building."
	standfirst="We would rather show one thing properly than list ten logos. Here is what we are working on, what problem it solves, and where it honestly stands."
/>

<Section label="Projects">
	<ul class="list" {@attach reveal({ children: true })}>
		{#each caseStudies as item (item.slug)}
			<li>
				<a href="/case-studies/{item.slug}" data-cursor="Read">
					<span class="body">
						<span class="name">{item.name}</span>
						<span class="line">{item.oneLine}</span>
						<span class="meta">{item.sector} · {item.status}{item.url ? ' · Live to try' : ''}</span
						>
					</span>
					<span class="arrow" aria-hidden="true">
						<HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={1.8} />
					</span>
				</a>
			</li>
		{/each}
	</ul>
</Section>

<CtaBand />

<style>
	.list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.list a {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		gap: 20px;
		padding: 24px 0;
		border-top: 1px solid var(--rule);
		transition: padding-inline var(--slow) var(--ease);
	}

	.list li:first-child a {
		padding-top: 0;
		border-top: none;
	}

	.list a:hover,
	.list a:focus-visible {
		padding-inline: 10px;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 6px;
		min-width: 0;
	}

	.name {
		font-family: var(--font-display);
		font-size: clamp(24px, 3.2vw, 34px);
		font-weight: 700;
		letter-spacing: -0.026em;
		line-height: 1.08;
	}

	.line {
		max-width: 54ch;
		font-size: 15px;
		color: var(--muted);
	}

	.meta {
		font-family: var(--font-mono);
		font-size: 10.5px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--faint);
	}

	.arrow {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border: 1px solid var(--rule);
		color: var(--muted);
		transition:
			transform var(--fast) var(--ease),
			border-color var(--fast) var(--ease),
			color var(--fast) var(--ease);
	}

	.list a:hover .arrow,
	.list a:focus-visible .arrow {
		transform: translate(3px, -3px);
		border-color: var(--ink);
		color: var(--ink);
	}

	@media (prefers-reduced-motion: reduce) {
		.list a:hover,
		.list a:focus-visible {
			padding-inline: 0;
		}
	}
</style>
