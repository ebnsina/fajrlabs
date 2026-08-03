<script lang="ts">
	import { HugeiconsIcon, PlusSignIcon, MinusSignIcon } from '#lib/icons.js';
	import Seo from '#lib/components/Seo.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import { reveal } from '#lib/motion.js';
	import { faqGroups } from '#lib/content/faq.js';

	const faqSchema = [
		{
			'@type': 'FAQPage',
			mainEntity: faqGroups.flatMap((group) =>
				group.items.map((item) => ({
					'@type': 'Question',
					name: item.question,
					acceptedAnswer: { '@type': 'Answer', text: item.answer }
				}))
			)
		}
	];
</script>

<Seo
	title="Common questions"
	description="Straight answers about how we price work, how long things take, who owns what we build, and the standard we hold every project to."
	schema={faqSchema}
/>

<PageHeader
	eyebrow="Common questions"
	title="The things people ask first."
	standfirst="Not here? Send it over. Every enquiry gets an answer within a working day, and we will not hide it behind a sales call."
/>

{#each faqGroups as group (group.heading)}
	<Section label={group.heading}>
		<div class="group" {@attach reveal()}>
			{#each group.items as item (item.question)}
				<details name="faq">
					<summary>
						<span class="question">{item.question}</span>
						<!-- Both glyphs are stacked and cross-faded, so the square never
						     moves. Rotating a plus into a minus is not possible; rotating
						     the box with it turned it into a diamond. -->
						<span class="marker" aria-hidden="true">
							<span class="glyph plus">
								<HugeiconsIcon icon={PlusSignIcon} size={15} strokeWidth={1.8} />
							</span>
							<span class="glyph minus">
								<HugeiconsIcon icon={MinusSignIcon} size={15} strokeWidth={1.8} />
							</span>
						</span>
					</summary>
					<p>{item.answer}</p>
				</details>
			{/each}
		</div>
	</Section>
{/each}

<CtaBand
	title="Still wondering something?"
	body="Ask it directly. There is a message box on the enquiry form, and a real person reads it."
/>

<style>
	.group {
		max-width: var(--measure);
	}

	details {
		border-top: 1px solid var(--rule);
	}

	details:first-child {
		border-top: none;
	}

	details:first-child summary {
		padding-top: 0;
	}

	summary {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 20px;
		padding: 18px 0;
		cursor: pointer;
		list-style: none;
		transition: color var(--fast) var(--ease);
	}

	summary::-webkit-details-marker {
		display: none;
	}

	.question {
		font-family: var(--font-display);
		font-size: 16.5px;
		letter-spacing: -0.012em;
	}

	summary:hover .question {
		color: var(--muted);
	}

	.marker {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 26px;
		height: 26px;
		border: 1px solid var(--rule);
		color: var(--muted);
		transition: border-color var(--fast) var(--ease);
	}

	.glyph {
		grid-area: 1 / 1;
		display: grid;
		place-items: center;
		transition: opacity var(--fast) var(--ease);
	}

	.minus {
		opacity: 0;
	}

	summary:hover .marker {
		border-color: var(--rule-strong);
	}

	details[open] .marker {
		border-color: var(--rule-strong);
	}

	details[open] .plus {
		opacity: 0;
	}

	details[open] .minus {
		opacity: 1;
	}

	details p {
		margin: 0;
		padding: 0 0 22px;
		max-width: 58ch;
		font-size: 15px;
		color: var(--muted);
		animation: unfold var(--slow) var(--ease);
	}

	@keyframes unfold {
		from {
			opacity: 0;
			transform: translateY(-6px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		details p {
			animation: none;
		}
	}
</style>
