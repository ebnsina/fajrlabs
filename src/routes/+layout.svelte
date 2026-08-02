<script lang="ts">
	import './layout.css';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import Cursor from '#lib/components/Cursor.svelte';
	import { onNavigate } from '$app/navigation';
	import { getMotionLevel } from '#lib/motion.js';

	let { children } = $props();

	/*
	 * Cross-fades between pages. The class scopes the styles to a navigation, so
	 * they do not also catch the theme wipe — both animate the same `root`
	 * snapshot. See layout.css for why each snapshot carries its own background.
	 */
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (getMotionLevel() === 'none') return;

		const root = document.documentElement;
		root.classList.add('nav-vt');

		return new Promise((resolve) => {
			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
			transition.finished.finally(() => root.classList.remove('nav-vt'));
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
