<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import { reveal } from '#lib/motion.js';
	import { about } from '#lib/content/about.js';
	import { site } from '#lib/content/site.js';
</script>

<Seo
	title="About"
	description="A small software studio that decided what it would not build before it decided what it would."
/>

<PageHeader eyebrow="About" title="Small on purpose." standfirst={about.standfirst} />

<Section label="The studio">
	<div class="prose" {@attach reveal()}>
		{#each about.intro as paragraph (paragraph)}
			<p>{paragraph}</p>
		{/each}
	</div>
</Section>

<Section label={about.name.heading}>
	<div class="naming" {@attach reveal()}>
		<p class="arabic" lang="ar" dir="rtl">{about.name.arabic}</p>
		{#each about.name.body as paragraph (paragraph)}
			<p>{paragraph}</p>
		{/each}
	</div>
</Section>

<Section label="What we believe">
	<ul class="beliefs" {@attach reveal()}>
		{#each about.beliefs as belief (belief.title)}
			<li>
				<h2>{belief.title}</h2>
				<p>{belief.note}</p>
			</li>
		{/each}
	</ul>
</Section>

<Section label="The details">
	<dl class="details" {@attach reveal()}>
		{#each about.how as row (row.label)}
			<div>
				<dt>{row.label}</dt>
				<dd>{row.value}</dd>
			</div>
		{/each}
		<div>
			<dt>Email</dt>
			<dd><a href="mailto:{site.email}">{site.email}</a></dd>
		</div>
	</dl>
</Section>

<CtaBand />

<style>
	.prose,
	.naming {
		max-width: var(--measure);
	}

	.arabic {
		margin: 0 0 22px;
		font-family: var(--font-arabic);
		font-size: clamp(30px, 4vw, 44px);
		line-height: 1.6;
	}

	.naming p {
		margin: 0 0 16px;
		font-size: 16.5px;
	}

	.naming p:last-child {
		margin-bottom: 0;
		color: var(--muted);
	}

	.prose p {
		margin: 0 0 18px;
		font-size: 16.5px;
	}

	.prose p:last-child {
		margin-bottom: 0;
	}

	.beliefs {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 30px 48px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@media (min-width: 640px) {
		.beliefs {
			grid-template-columns: 1fr 1fr;
		}
	}

	.beliefs h2 {
		margin: 0;
		font-size: 17.5px;
		font-stretch: 92%;
		letter-spacing: -0.016em;
	}

	.beliefs p {
		margin: 8px 0 0;
		font-size: 14.5px;
		color: var(--muted);
	}

	.details {
		display: flex;
		flex-direction: column;
		margin: 0;
		max-width: var(--measure);
	}

	.details > div {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 2px;
		padding: 14px 0;
		border-top: 1px solid var(--rule);
	}

	@media (min-width: 620px) {
		.details > div {
			grid-template-columns: 140px minmax(0, 1fr);
			gap: 20px;
		}
	}

	.details > div:first-child {
		border-top: none;
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
</style>
