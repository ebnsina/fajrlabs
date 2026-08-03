<script lang="ts">
	import { ArrowLeft02Icon, HugeiconsIcon } from '#lib/icons.js';
	import Seo from '#lib/components/Seo.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import { reveal } from '#lib/motion.js';

	let { data } = $props();

	const item = $derived(data.item);
</script>

<Seo
	title={item.name}
	description={item.oneLine}
	image={item.shots?.[0] && {
		src: item.shots[0].src,
		width: item.shots[0].width,
		height: item.shots[0].height,
		alt: item.shots[0].alt
	}}
/>

<PageHeader eyebrow="Case studies" title={item.name} standfirst={item.oneLine} />

<Section label="Where it stands">
	<dl class="facts" {@attach reveal()}>
		<div>
			<dt>Status</dt>
			<dd>{item.status}</dd>
		</div>
		<div>
			<dt>Sector</dt>
			<dd>{item.sector}</dd>
		</div>
		{#if item.url}
			<div>
				<dt>See it</dt>
				<dd>
					<a href={item.url} rel="noopener" data-cursor="Open">
						{item.url.replace('https://', '')}
					</a>
				</dd>
			</div>
		{/if}
	</dl>
</Section>

<Section label="The problem">
	<div class="prose" {@attach reveal()}>
		{#each item.problem as paragraph (paragraph)}
			<p>{paragraph}</p>
		{/each}
	</div>
</Section>

<Section label="What we decided">
	<ol class="decisions" {@attach reveal()}>
		{#each item.decisions as decision, index (decision.title)}
			<li>
				<span class="number">{String(index + 1).padStart(2, '0')}</span>
				<div>
					<h2>{decision.title}</h2>
					<p>{decision.detail}</p>
				</div>
			</li>
		{/each}
	</ol>
</Section>

{#if item.shots?.length}
	<Section label="What it looks like">
		<div class="shots" {@attach reveal()}>
			{#each item.shots as shot (shot.src)}
				<figure>
					<img
						src={shot.src}
						width={shot.width}
						height={shot.height}
						alt={shot.alt}
						loading="lazy"
						decoding="async"
					/>
					<figcaption>{shot.caption}</figcaption>
				</figure>
			{/each}
		</div>
	</Section>
{/if}

<Section label="Honestly">
	<p class="standing" {@attach reveal()}>{item.standing}</p>

	<a class="back" href="/case-studies">
		<span class="icon" aria-hidden="true">
			<HugeiconsIcon icon={ArrowLeft02Icon} size={15} strokeWidth={2} />
		</span>
		All case studies
	</a>
</Section>

<CtaBand />

<style>
	.facts {
		display: flex;
		flex-direction: column;
		margin: 0;
		max-width: var(--measure);
	}

	.facts > div {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 2px;
		padding: 14px 0;
		border-top: 1px solid var(--rule);
	}

	@media (min-width: 620px) {
		.facts > div {
			grid-template-columns: 120px minmax(0, 1fr);
			gap: 20px;
		}
	}

	.facts > div:first-child {
		border-top: none;
		padding-top: 0;
	}

	dt {
		font-family: var(--font-mono);
		font-size: 10.5px;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: var(--faint);
		padding-top: 3px;
	}

	dd {
		margin: 0;
		font-size: 15px;
	}

	dd a {
		border-bottom: 1px solid var(--rule-strong);
		padding-bottom: 1px;
		transition: border-color var(--fast) var(--ease);
	}

	dd a:hover,
	dd a:focus-visible {
		border-color: var(--ink);
	}

	.prose {
		max-width: var(--measure);
	}

	.prose p {
		margin: 0 0 18px;
		font-size: 16.5px;
	}

	.prose p:last-child {
		margin-bottom: 0;
	}

	.decisions {
		display: flex;
		flex-direction: column;
		gap: 30px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.decisions li {
		display: grid;
		grid-template-columns: 42px minmax(0, 1fr);
		gap: 16px;
		max-width: var(--measure);
	}

	.number {
		font-family: var(--font-mono);
		font-size: 11px;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.08em;
		color: var(--faint);
		padding-top: 6px;
	}

	.decisions h2 {
		margin: 0;
		font-size: 19px;
		letter-spacing: -0.018em;
	}

	.decisions p {
		margin: 7px 0 0;
		font-size: 14.5px;
		color: var(--muted);
	}

	.shots {
		display: flex;
		flex-direction: column;
		gap: 44px;
	}

	figure {
		margin: 0;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		border: 1px solid var(--rule);
	}

	figcaption {
		margin-top: 14px;
		max-width: var(--measure);
		font-size: 14.5px;
		color: var(--muted);
	}

	.standing {
		margin: 0;
		max-width: var(--measure);
		font-size: clamp(16.5px, 1.8vw, 19px);
		line-height: 1.55;
	}

	.back {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		margin-top: 34px;
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
