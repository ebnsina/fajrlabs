<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import { reveal } from '#lib/motion.js';
	import { engagements } from '#lib/content/engagements.js';
</script>

<Seo
	title="Working together"
	description="Three ways to work with us: a fixed-price project, ongoing monthly support, or working alongside your own team."
/>

<PageHeader
	eyebrow="Working together"
	title="Three ways to work with us."
	standfirst={engagements.standfirst}
/>

<Section label="The options" labelAlign="display">
	<div class="options" {@attach reveal()}>
		{#each engagements.options as option (option.name)}
			<article>
				<span class="best-for">{option.bestFor}</span>
				<h2>{option.name}</h2>
				<p class="summary">{option.summary}</p>

				<ul>
					{#each option.includes as item (item)}
						<li>{item}</li>
					{/each}
				</ul>

				<dl>
					<div>
						<dt>Commitment</dt>
						<dd>{option.commitment}</dd>
					</div>
					<div>
						<dt>How you pay</dt>
						<dd>{option.billing}</dd>
					</div>
				</dl>
			</article>
		{/each}
	</div>
</Section>

<Section label="About price">
	<div class="notes" {@attach reveal()}>
		<p class="pricing">{engagements.pricingNote}</p>
		<p class="fallback">{engagements.notRightNote}</p>
	</div>
</Section>

<CtaBand
	title="Not sure which one fits?"
	body="Describe your situation on the enquiry form and we will tell you which arrangement makes sense — including when the smaller one is the right answer."
/>

<style>
	.options {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 40px;
	}

	/* Subgrid keeps the heading, summary, list and terms on the same lines
	   across all three columns, whatever the copy length. */
	@media (min-width: 900px) {
		.options {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			grid-template-rows: auto auto auto 1fr auto;
			gap: 0;
		}

		article {
			grid-row: span 5;
			grid-template-rows: subgrid;
			row-gap: 0;
			padding-inline: 36px;
			border-left: 1px solid var(--rule);
		}

		article:first-child {
			padding-left: 0;
			border-left: none;
		}

		article:last-child {
			padding-right: 0;
		}
	}

	article {
		display: grid;
		align-content: start;
	}

	.best-for {
		display: block;
		font-family: var(--font-mono);
		font-size: 10.5px;
		line-height: 1.5;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: var(--faint);
	}

	h2 {
		margin: 10px 0 18px;
		font-size: clamp(21px, 2.4vw, 26px);
		font-stretch: 90%;
		letter-spacing: -0.022em;
		line-height: 1.1;
	}

	.summary {
		margin: 0;
		padding-bottom: 22px;
		font-size: 14.5px;
		color: var(--muted);
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 11px;
		margin: 0;
		padding: 0 0 36px;
		list-style: none;
	}

	li {
		font-size: 14.5px;
	}

	/* No rule here: it could only span the text column, never the full width. */
	dl {
		display: flex;
		flex-direction: column;
		gap: 14px;
		margin: 0;
	}

	dt {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--faint);
	}

	dd {
		margin: 4px 0 0;
		font-size: 14px;
		color: var(--muted);
	}

	.notes {
		max-width: var(--measure);
	}

	.pricing {
		margin: 0;
		font-size: clamp(17px, 1.9vw, 20px);
		line-height: 1.5;
	}

	.fallback {
		margin: 18px 0 0;
		color: var(--muted);
	}
</style>
