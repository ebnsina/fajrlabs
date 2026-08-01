<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import ServiceRow from '#lib/components/ServiceRow.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import { reveal } from '#lib/motion.js';
	import { services } from '#lib/content/services.js';
</script>

<Seo
	title="Services"
	description="Custom software, mobile apps, plugins and practical AI automation, built for businesses that want the work done properly."
/>

<PageHeader
	eyebrow="Services"
	title="Four things. Done properly."
	standfirst="Better to be good at a few things than passable at everything. Outside this list, ask anyway."
/>

<Section label="What we build" labelAlign="display">
	<div {@attach reveal()}>
		{#each services as service (service.slug)}
			<ServiceRow {service} />
		{/each}
	</div>
</Section>

<Section label="Not sure yet?" labelAlign="display">
	<div class="unsure" {@attach reveal()}>
		<h2>You do not need to know which one you want.</h2>
		<p>
			Most people arrive with a problem, not a shopping list. That is the better way round. Tell us
			what is going wrong and we will work out what fixes it.
		</p>
	</div>
</Section>

<CtaBand />

<style>
	.unsure h2 {
		margin: 0;
		max-width: 20ch;
		font-size: clamp(24px, 3.2vw, 34px);
		font-stretch: 88%;
		letter-spacing: -0.026em;
		line-height: 1.08;
	}

	.unsure p {
		margin: 16px 0 0;
		max-width: var(--measure);
		color: var(--muted);
	}
</style>
