<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import { reveal } from '#lib/motion.js';
	import { HugeiconsIcon, Tick02Icon, Cancel01Icon } from '#lib/icons.js';
	import { ethics } from '#lib/content/ethics.js';
</script>

<Seo
	title={ethics.title}
	description="The written standard we hold every project to — the work we take on, the work we turn down, and how we check before quoting."
/>

<PageHeader eyebrow="Our standard" title={ethics.title} standfirst={ethics.standfirst} />

<Section label="What it means">
	<div class="prose" {@attach reveal()}>
		{#each ethics.intro as paragraph (paragraph)}
			<p>{paragraph}</p>
		{/each}
	</div>
</Section>

<Section label="Work we take on">
	<ul class="positions" {@attach reveal()}>
		{#each ethics.accept as item (item.title)}
			<li>
				<span class="mark" aria-hidden="true">
					<HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={2.2} />
				</span>
				<h2>{item.title}</h2>
				<p>{item.note}</p>
			</li>
		{/each}
	</ul>
</Section>

<Section label="Work we turn down">
	<ul class="positions decline" {@attach reveal()}>
		{#each ethics.decline as item (item.title)}
			<li>
				<span class="mark" aria-hidden="true">
					<HugeiconsIcon icon={Cancel01Icon} size={14} strokeWidth={2.2} />
				</span>
				<h2>{item.title}</h2>
				<p>{item.note}</p>
			</li>
		{/each}
	</ul>
</Section>

<Section label="How we check">
	<ol class="checks" {@attach reveal()}>
		{#each ethics.howWeCheck as item, index (item.step)}
			<li>
				<span class="number">{String(index + 1).padStart(2, '0')}</span>
				<div>
					<h2>{item.step}</h2>
					<p>{item.detail}</p>
				</div>
			</li>
		{/each}
	</ol>
</Section>

<Section label="Where it comes from" labelAlign="display">
	<div class="sources" {@attach reveal()}>
		{#each ethics.sources as source (source.reference)}
			<div class="source">
				<figure>
					<p class="arabic" lang="ar" dir="rtl">{source.arabic}</p>
					<blockquote>{source.translation}</blockquote>
					<figcaption>{source.reference}</figcaption>
				</figure>
				<p class="why">{source.why}</p>
			</div>
		{/each}
		<p class="disclaimer">{ethics.sourcesNote}</p>
	</div>
</Section>

<Section label="In closing" labelAlign="display">
	<p class="closing" {@attach reveal()}>{ethics.closing}</p>
</Section>

<CtaBand
	title="Wondering whether your project fits?"
	body="Ask us. You will get a straight answer within a working day, and if it is not work for us we will tell you why and suggest who might suit you better."
/>

<style>
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

	.positions,
	.checks {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.positions {
		display: flex;
		flex-direction: column;
		gap: 22px;
	}

	.positions li {
		display: grid;
		grid-template-columns: 30px minmax(0, 1fr);
		gap: 12px;
		max-width: var(--measure);
	}

	.mark {
		display: grid;
		place-items: center;
		width: 22px;
		height: 22px;
		margin-top: 2px;
		color: var(--faint);
	}

	.positions li:first-child {
		border-top: none;
	}

	/* Weight is pinned because these read as h2 but must not gain display weight. */
	.positions h2 {
		margin: 0;
		font-size: 18.5px;
		font-weight: 600;
		font-stretch: 92%;
		letter-spacing: -0.016em;
	}

	.decline h2 {
		color: var(--muted);
		text-decoration: line-through;
		text-decoration-thickness: 1px;
		text-underline-offset: 4px;
	}

	.positions li > h2,
	.positions li > p {
		grid-column: 2;
	}

	.positions p {
		margin: 5px 0 0;
		font-size: 14.5px;
		color: var(--muted);
	}

	.checks {
		display: flex;
		flex-direction: column;
		gap: 22px;
	}

	.checks li {
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
		padding-top: 5px;
	}

	.checks h2 {
		margin: 0;
		font-size: 17px;
		font-weight: 600;
		font-stretch: 94%;
		letter-spacing: -0.014em;
	}

	.checks p {
		margin: 4px 0 0;
		font-size: 14.5px;
		color: var(--muted);
	}

	.sources {
		display: flex;
		flex-direction: column;
		gap: 44px;
		max-width: var(--measure);
	}

	figure {
		margin: 0;
	}

	.arabic {
		margin: 0 0 18px;
		font-family: var(--font-arabic);
		font-size: clamp(21px, 2.6vw, 27px);
		line-height: 2;
		color: var(--ink);
	}

	blockquote {
		margin: 0;
		padding-left: 18px;
		border-left: 2px solid var(--rule-strong);
		font-size: clamp(16px, 1.8vw, 19px);
		line-height: 1.55;
	}

	figcaption {
		margin-top: 12px;
		padding-left: 20px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		color: var(--faint);
	}

	.why {
		margin: 16px 0 0;
		padding-left: 20px;
		font-size: 14.5px;
		color: var(--muted);
	}

	.disclaimer {
		margin: 0;
		padding-top: 24px;
		border-top: 1px solid var(--rule);
		font-size: 14px;
		color: var(--faint);
	}

	.closing {
		margin: 0;
		max-width: 34ch;
		font-size: clamp(20px, 2.6vw, 28px);
		font-stretch: 90%;
		letter-spacing: -0.022em;
		line-height: 1.24;
	}
</style>
