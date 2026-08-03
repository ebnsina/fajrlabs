<script lang="ts">
	import { site } from '#lib/content/site.js';

	type Props = {
		/** Renders as a link when set, otherwise as plain text (the footer). */
		href?: string;
	};

	let { href }: Props = $props();
</script>

{#snippet mark()}
	<!-- Only the strong word swaps: the Arabic reads فَجْر, which is Fajr alone. -->
	<span class="swap">
		<span class="face latin">{site.wordmark.strong}</span>
		<!-- Decorative duplicate; the Latin wordmark stays the accessible name. -->
		<span class="face arabic" lang="ar" dir="rtl" aria-hidden="true">{site.arabicName}</span>
	</span><span class="soft">{site.wordmark.soft}</span>
{/snippet}

{#if href}
	<a class="wordmark" {href} aria-label="{site.name} home">{@render mark()}</a>
{:else}
	<span class="wordmark">{@render mark()}</span>
{/if}

<style>
	.wordmark {
		display: inline-flex;
		align-items: center;
		font-size: 18px;
		font-stretch: 88%;
		letter-spacing: 0.04em;
		line-height: 1.4;
		white-space: nowrap;
	}

	/*
	 * One grid cell holds both faces, so the widest sets the width and "Labs"
	 * never shifts as the word swaps beneath it.
	 */
	.swap {
		display: inline-grid;
		overflow: hidden;
		height: 1.4em;
	}

	.face {
		grid-area: 1 / 1;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.latin {
		font-weight: 700;
		color: var(--ink);
	}

	.arabic {
		font-family: var(--font-arabic);
		font-weight: 400;
		font-size: 1.12em;
		letter-spacing: 0;
		color: var(--ink);
		transform: translateY(115%);
	}

	/* Labs exists because the domain needed it; it should not compete. */
	.soft {
		font-weight: 400;
		color: var(--muted);
	}

	.soft::before {
		/* Non-breaking: a plain space between inline elements collapses. */
		content: '\00a0';
	}

	.wordmark:hover .latin,
	.wordmark:focus-visible .latin {
		transform: translateY(-115%);
	}

	.wordmark:hover .arabic,
	.wordmark:focus-visible .arabic {
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		.face {
			transition: none;
		}

		.wordmark:hover .latin,
		.wordmark:focus-visible .latin {
			transform: none;
		}

		.wordmark:hover .arabic,
		.wordmark:focus-visible .arabic {
			transform: translateY(115%);
		}
	}
</style>
