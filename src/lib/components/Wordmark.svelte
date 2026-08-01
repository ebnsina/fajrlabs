<script lang="ts">
	import { site } from '#lib/content/site.js';

	type Props = {
		/** Renders as a link when set, otherwise as plain text (the footer). */
		href?: string;
	};

	let { href }: Props = $props();
</script>

{#snippet stack()}
	<span class="stack">
		<span class="face latin">{site.shortName}</span>
		<!-- Decorative duplicate: the Latin wordmark is the accessible name. -->
		<span class="face arabic" lang="ar" dir="rtl" aria-hidden="true">{site.arabicName}</span>
	</span>
{/snippet}

{#if href}
	<a class="mark" {href} aria-label="{site.name} home">{@render stack()}</a>
{:else}
	<span class="mark">{@render stack()}</span>
{/if}

<style>
	.mark {
		display: inline-block;
		font-size: 15px;
		font-weight: 700;
		font-stretch: 88%;
		letter-spacing: 0.04em;
		line-height: 1.4;
		white-space: nowrap;
	}

	/* Both faces occupy one cell; the container clips whichever is out of frame. */
	.stack {
		display: inline-grid;
		overflow: hidden;
		height: 1.4em;
	}

	.face {
		grid-area: 1 / 1;
		display: flex;
		align-items: center;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.arabic {
		font-family: var(--font-arabic);
		font-weight: 400;
		font-size: 1.15em;
		letter-spacing: 0;
		transform: translateY(110%);
	}

	.mark:hover .latin,
	.mark:focus-visible .latin {
		transform: translateY(-110%);
	}

	.mark:hover .arabic,
	.mark:focus-visible .arabic {
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		.face {
			transition: none;
		}

		/* No roll, so the Arabic never needs to move into view. */
		.mark:hover .latin,
		.mark:focus-visible .latin {
			transform: none;
		}

		.mark:hover .arabic,
		.mark:focus-visible .arabic {
			transform: translateY(110%);
		}
	}
</style>
