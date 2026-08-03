<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import { reveal } from '#lib/motion.js';
	import { process } from '#lib/content/process.js';
</script>

<Seo
	title="Process"
	description="How a project runs with us: a conversation, a written plan with a fixed price, work you can see every week, a careful launch, and proper support afterwards."
/>

<PageHeader
	eyebrow="How we work"
	title="No mystery. No surprises."
	standfirst={process.standfirst}
/>

<Section label="The five stages" labelAlign="display">
	<ol class="steps" {@attach reveal()}>
		{#each process.steps as step, index (step.title)}
			<li>
				<span class="number">{String(index + 1).padStart(2, '0')}</span>
				<div class="body">
					<h2>{step.title}</h2>
					<p class="summary">{step.summary}</p>
					<p class="detail">{step.detail}</p>
					<p class="your-part"><span>Your part</span>{step.yourPart}</p>
				</div>
			</li>
		{/each}
	</ol>
</Section>

<Section label="What we promise">
	<ul class="promises" {@attach reveal()}>
		{#each process.promises as promise (promise.title)}
			<li>
				<h3>{promise.title}</h3>
				<p>{promise.note}</p>
			</li>
		{/each}
	</ul>
</Section>

<CtaBand />

<style>
	.steps,
	.promises {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.steps li {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 10px;
		padding: 28px 0;
		border-top: 1px solid var(--rule);
	}

	@media (min-width: 640px) {
		.steps li {
			grid-template-columns: 52px minmax(0, 1fr);
			gap: 20px;
		}
	}

	.steps li:first-child {
		border-top: none;
		padding-top: 0;
	}

	.number {
		font-family: var(--font-mono);
		font-size: 12px;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.08em;
		color: var(--faint);
		padding-top: 8px;
	}

	.body {
		max-width: var(--measure);
	}

	.steps h2 {
		margin: 0;
		font-size: clamp(21px, 2.7vw, 28px);
		letter-spacing: -0.022em;
		line-height: 1.12;
	}

	.summary {
		margin: 6px 0 0;
		font-family: var(--font-mono);
		font-size: 11.5px;
		letter-spacing: 0.06em;
		color: var(--faint);
	}

	.detail {
		margin: 16px 0 0;
		color: var(--muted);
	}

	.your-part {
		display: flex;
		flex-direction: column;
		gap: 5px;
		margin: 18px 0 0;
		padding: 14px 18px;
		background: var(--surface);
		font-size: 14.5px;
	}

	.your-part span {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--faint);
	}

	.promises {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 30px 48px;
	}

	@media (min-width: 640px) {
		.promises {
			grid-template-columns: 1fr 1fr;
		}
	}

	.promises h3 {
		margin: 0;
		font-size: 17px;
		letter-spacing: -0.016em;
	}

	.promises p {
		margin: 8px 0 0;
		font-size: 14.5px;
		color: var(--muted);
	}
</style>
