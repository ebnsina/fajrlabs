<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** Rail label shown in the left column on wide screens. */
		label?: string;
		id?: string;
		/** Draws the hairline rule above the section. */
		divided?: boolean;
		/** Nudges the label so it sits on the first line of the content it labels. */
		labelAlign?: 'body' | 'display';
		children: Snippet;
	};

	let { label, id, divided = true, labelAlign = 'body', children }: Props = $props();
</script>

<section {id} class="section" class:divided>
	<div class="rail">
		{#if label}<span class="label {labelAlign}">{label}</span>{:else}<span></span>{/if}
		<div class="content">{@render children()}</div>
	</div>
</section>

<style>
	.section {
		padding-block: clamp(40px, 6vw, 80px);
	}

	.divided {
		border-top: 1px solid var(--rule);
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
		line-height: 1;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--faint);
		opacity: 0;
		transition: opacity 0.35s var(--ease);
	}

	/* Focus-within keeps the label reachable when tabbing rather than pointing. */
	.section:hover .label,
	.section:focus-within .label {
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

	/* Optical offsets: enough to clear the leading above the first line. */
	.label.body {
		padding-top: 7px;
	}

	.label.display {
		padding-top: 11px;
	}

	.content {
		min-width: 0;
	}
</style>
