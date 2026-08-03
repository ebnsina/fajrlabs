<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import Section from '#lib/components/Section.svelte';
	import Button from '#lib/components/Button.svelte';
	import ServiceRow from '#lib/components/ServiceRow.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import { reveal, splitReveal } from '#lib/motion.js';
	import { HugeiconsIcon, Tick02Icon, Cancel01Icon } from '#lib/icons.js';
	import { site } from '#lib/content/site.js';
	import { services } from '#lib/content/services.js';
	import { ethics } from '#lib/content/ethics.js';
	import { process } from '#lib/content/process.js';
</script>

<Seo title="Home" description={site.description} />

<section class="hero">
	<div class="rail">
		<span class="label">What we do</span>
		<div>
			<h1 {@attach splitReveal({ onLoad: true })}>
				Software built to a standard, <em>not to a brief.</em>
			</h1>
			<p class="sub" {@attach reveal({ delay: 150 })}>
				Custom software, mobile apps, plugins and practical automation. Built to a standard we
				publish, not one we claim.
			</p>
			<div class="actions" {@attach reveal({ delay: 230 })}>
				<Button href="/contact" withArrow>Start a project</Button>
				<Button href="/halal-by-design" variant="ghost">Read our standard</Button>
			</div>
		</div>
	</div>
</section>

<Section label="What we build" labelAlign="display">
	<div {@attach reveal({ children: true })}>
		{#each services as service (service.slug)}
			<ServiceRow {service} />
		{/each}
	</div>
</Section>

<Section label="The standard" labelAlign="display">
	<div class="standard-intro">
		<h2 {@attach splitReveal()}>We wrote the line down, so nobody has to guess.</h2>
		<p>
			Every enquiry meets the same test, including the well-funded ones. Any that fails it, we turn
			down. That is the point.
		</p>
	</div>

	<div class="standard" {@attach reveal({ delay: 60 })}>
		<div class="column">
			<span class="col-label">Work we take on</span>
			<ul>
				{#each ethics.accept as item (item.title)}
					<li>
						<HugeiconsIcon icon={Tick02Icon} size={13} strokeWidth={2.4} />
						{item.title}
					</li>
				{/each}
			</ul>
		</div>
		<div class="column decline">
			<span class="col-label">Work we turn down</span>
			<ul>
				{#each ethics.decline as item (item.title)}
					<li>
						<HugeiconsIcon icon={Cancel01Icon} size={13} strokeWidth={2.4} />
						<span>{item.title}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<a class="more" href="/halal-by-design">Read the full standard</a>
</Section>

<Section label="How we work">
	<ol class="process" {@attach reveal({ children: true })}>
		{#each process.steps as step, index (step.title)}
			<li>
				<span class="step-number">{String(index + 1).padStart(2, '0')}</span>
				<div>
					<h3>{step.title}</h3>
					<p>{step.summary}</p>
				</div>
			</li>
		{/each}
	</ol>
	<a class="more" href="/process">See how a project runs</a>
</Section>

<CtaBand />

<style>
	.hero {
		padding-block: clamp(52px, 9vw, 116px) clamp(44px, 7vw, 92px);
	}

	.rail {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 14px;
		max-width: 1240px;
		margin: 0 auto;
		padding-inline: var(--gutter);
	}

	@media (min-width: 900px) {
		.rail {
			grid-template-columns: var(--rail) minmax(0, 1fr);
			gap: 0 40px;
		}
	}

	.label {
		font-family: var(--font-mono);
		font-size: 10.5px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--faint);
		padding-top: 14px;
		opacity: 0;
		transition: opacity 0.35s var(--ease);
	}

	/* Focus-within keeps the label reachable when tabbing rather than pointing. */
	.hero:hover .label,
	.hero:focus-within .label {
		opacity: 1;
	}

	/* Nothing hovers on a touch screen, so the label simply stays. */
	@media (hover: none), (pointer: coarse) {
		.label {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.label {
			transition: none;
		}
	}

	h1 {
		margin: 0;
		max-width: 15ch;
		font-size: clamp(40px, 7.2vw, 92px);
		letter-spacing: -0.038em;
		line-height: 0.97;
	}

	/* Contrast comes from weight, not colour — the family runs 200–900. */
	h1 em {
		display: block;
		font-style: normal;
		font-weight: 300;
		color: var(--ink);
	}

	.sub {
		margin: 28px 0 0;
		max-width: 50ch;
		font-size: clamp(15.5px, 1.5vw, 18px);
		color: var(--muted);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 32px;
	}

	.standard-intro h2 {
		margin: 0;
		max-width: 20ch;
		font-size: clamp(24px, 3.2vw, 36px);
		letter-spacing: -0.026em;
		line-height: 1.08;
	}

	.standard-intro p {
		margin: 16px 0 0;
		max-width: var(--measure);
		color: var(--muted);
	}

	.standard {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 32px;
		margin-top: 36px;
	}

	@media (min-width: 720px) {
		.standard {
			grid-template-columns: 1fr 1fr;
			gap: 56px;
		}
	}

	.col-label {
		font-family: var(--font-mono);
		font-size: 10.5px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--faint);
	}

	.column ul {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin: 16px 0 0;
		padding: 0;
		list-style: none;
	}

	.column li {
		display: grid;
		grid-template-columns: 20px minmax(0, 1fr);
		align-items: start;
		gap: 10px;
		font-size: 14.5px;
	}

	.column li :global(svg) {
		margin-top: 4px;
		color: var(--faint);
	}

	.decline li {
		color: var(--muted);
	}

	.decline li span {
		text-decoration: line-through;
		text-decoration-thickness: 1px;
		text-underline-offset: 3px;
	}

	.process {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.process li {
		display: grid;
		grid-template-columns: 42px minmax(0, 1fr);
		gap: 16px;
		padding: 16px 0;
		border-top: 1px solid var(--rule);
	}

	.process li:first-child {
		padding-top: 0;
		border-top: none;
	}

	.step-number {
		font-family: var(--font-mono);
		font-size: 11px;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.08em;
		color: var(--faint);
		padding-top: 5px;
	}

	.process h3 {
		margin: 0;
		font-size: 18px;
		letter-spacing: -0.014em;
	}

	.process p {
		margin: 3px 0 0;
		font-size: 14.5px;
		color: var(--muted);
	}

	.more {
		display: inline-block;
		margin-top: 26px;
		padding-bottom: 3px;
		border-bottom: 1px solid var(--rule-strong);
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		transition: border-color var(--fast) var(--ease);
	}

	.more:hover,
	.more:focus-visible {
		border-color: var(--ink);
	}
</style>
