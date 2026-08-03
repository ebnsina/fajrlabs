<script lang="ts">
	import { HugeiconsIcon, Tick02Icon } from '#lib/icons.js';
	import Seo from '#lib/components/Seo.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import Button from '#lib/components/Button.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import { reveal } from '#lib/motion.js';
	import { services } from '#lib/content/services.js';
	import { site } from '#lib/content/site.js';

	let { data } = $props();

	const service = $derived(data.service);
	const others = $derived(services.filter((item) => item.slug !== service.slug));

	const serviceSchema = $derived([
		{
			'@type': 'Service',
			name: service.name,
			description: service.lead,
			serviceType: service.name,
			provider: { '@id': `${site.url}/#organization` },
			areaServed: 'Worldwide'
		}
	]);
</script>

<Seo title={service.name} description={service.oneLine} schema={serviceSchema} />

<PageHeader eyebrow="Services" title={service.name} standfirst={service.oneLine}>
	{#snippet actions()}
		<Button href="/contact" withArrow>Start a project</Button>
	{/snippet}
</PageHeader>

<Section label="In short">
	<p class="lead" {@attach reveal()}>{service.lead}</p>
</Section>

<Section label="What you get">
	<ul class="checks" {@attach reveal()}>
		{#each service.delivers as item (item)}
			<li>
				<span class="tick" aria-hidden="true"
					><HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={2.2} /></span
				>
				{item}
			</li>
		{/each}
	</ul>
</Section>

<Section label="A good fit if">
	<ul class="fit" {@attach reveal()}>
		{#each service.suitedTo as item (item)}
			<li>{item}</li>
		{/each}
	</ul>
</Section>

<Section label="Timing">
	<div class="timing" {@attach reveal()}>
		<p class="timeline">{service.timeline}</p>
		<p class="closing">{service.closing}</p>
	</div>
</Section>

<Section label="Also from us">
	<ul class="others" {@attach reveal()}>
		{#each others as item (item.slug)}
			<li>
				<a href="/services/{item.slug}">
					<span class="other-name">{item.name}</span>
					<span class="other-line">{item.oneLine}</span>
				</a>
			</li>
		{/each}
	</ul>
</Section>

<CtaBand />

<style>
	.lead {
		margin: 0;
		max-width: var(--measure);
		font-size: clamp(17px, 1.9vw, 21px);
		line-height: 1.55;
	}

	.checks,
	.fit,
	.others {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.checks {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.checks li {
		display: grid;
		grid-template-columns: 26px minmax(0, 1fr);
		gap: 12px;
		align-items: start;
		max-width: var(--measure);
	}

	.tick {
		display: grid;
		place-items: center;
		width: 22px;
		height: 22px;
		color: var(--faint);
	}

	.fit {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 14px 48px;
		max-width: var(--measure);
	}

	@media (min-width: 640px) {
		.fit {
			grid-template-columns: 1fr 1fr;
		}
	}

	.fit {
		gap: 14px 40px;
	}

	.fit li {
		font-size: 15px;
		color: var(--muted);
	}

	.timing {
		max-width: var(--measure);
	}

	.timeline {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 13px;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.02em;
	}

	.closing {
		margin: 16px 0 0;
		color: var(--muted);
	}

	.others {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 28px;
	}

	.others a {
		display: flex;
		flex-direction: column;
		gap: 5px;
		height: 100%;
		padding-top: 16px;
		border-top: 1px solid var(--rule);
		transition: border-color var(--fast) var(--ease);
	}

	.others a:hover,
	.others a:focus-visible {
		border-color: var(--ink);
	}

	.other-name {
		font-family: var(--font-display);
		font-size: 17px;
		letter-spacing: -0.016em;
	}

	.other-line {
		font-size: 14px;
		color: var(--muted);
	}
</style>
