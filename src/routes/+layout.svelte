<script lang="ts">
	import './layout.css';
	import { onNavigate } from '$app/navigation';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import Cursor from '#lib/components/Cursor.svelte';

	let { children } = $props();

	// Cross-fade between pages where the browser supports it.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<a class="skip" href="#main">Skip to content</a>
<Cursor />
<SiteHeader />
<!-- tabindex makes the skip link actually move focus, not just scroll. -->
<main id="main" tabindex="-1">{@render children()}</main>
<SiteFooter />

<style>
	main {
		display: block;
		min-height: 60vh;
	}

	/* The skip link and the scroll are the cue; a ring round the whole page is not. */
	main:focus {
		outline: none;
	}

	/* Fixed rather than absolute, so it is reachable part-way down a page too. */
	.skip {
		position: fixed;
		left: -9999px;
		z-index: 60;
		padding: 12px 18px;
		background: var(--inverse-paper);
		color: var(--inverse-ink);
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.skip:focus {
		left: var(--gutter);
		top: 12px;
	}
</style>
