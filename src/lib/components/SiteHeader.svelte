<script lang="ts">
	import { HugeiconsIcon, Menu01Icon, Cancel01Icon } from '#lib/icons.js';
	import { page } from '$app/state';
	import { nav, site } from '#lib/content/site.js';
	import ThemeToggle from './ThemeToggle.svelte';

	let menuOpen = $state(false);

	const currentPath = $derived(page.url.pathname);

	function isActive(href: string) {
		return currentPath === href || currentPath.startsWith(`${href}/`);
	}

	// Close the mobile menu whenever navigation lands on a new page.
	$effect(() => {
		void currentPath;
		menuOpen = false;
	});
</script>

<svelte:window onkeydown={(event) => event.key === 'Escape' && (menuOpen = false)} />

<header>
	<div class="bar">
		<a class="brand" href="/" aria-label="{site.name} home">{site.shortName}</a>

		<nav class="desktop" aria-label="Main">
			{#each nav as item (item.href)}
				<a
					href={item.href}
					class:active={isActive(item.href)}
					aria-current={isActive(item.href) ? 'page' : undefined}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="actions">
			<a class="cta desktop-only" href="/contact">Start a project</a>
			<ThemeToggle />
			<button
				type="button"
				class="menu-button"
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
				onclick={() => (menuOpen = !menuOpen)}
			>
				{#if menuOpen}
					<HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={1.8} />
				{:else}
					<HugeiconsIcon icon={Menu01Icon} size={18} strokeWidth={1.8} />
				{/if}
				<span class="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
			</button>
		</div>
	</div>

	{#if menuOpen}
		<nav id="mobile-menu" class="mobile" aria-label="Main">
			{#each nav as item, index (item.href)}
				<a href={item.href} class:active={isActive(item.href)} style="--stagger: {index * 28}ms">
					{item.label}
				</a>
			{/each}
			<a class="cta mobile-cta" href="/contact" style="--stagger: {nav.length * 28}ms">
				Start a project
			</a>
		</nav>
	{/if}
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 40;
		/* Opaque enough to stay legible on its own; the blur is an enhancement,
		   not something the header depends on to hide the content beneath it. */
		background: color-mix(in srgb, var(--paper) 94%, transparent);
	}

	/* Only thin the background where the blur genuinely composites. */
	@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
		header {
			background: color-mix(in srgb, var(--paper) 82%, transparent);
			/* Prefix first: the minifier keeps the last of a duplicate pair, and
			   dropping the standard property leaves the blur inert. */
			-webkit-backdrop-filter: blur(14px) saturate(150%);
			backdrop-filter: blur(14px) saturate(150%);
		}
	}

	/* Content dissolves under the bar instead of hitting a hard line. */
	header::after {
		content: '';
		position: absolute;
		inset: 100% 0 auto;
		height: 28px;
		background: linear-gradient(
			to bottom,
			color-mix(in srgb, var(--paper) 88%, transparent),
			transparent
		);
		pointer-events: none;
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		max-width: 1240px;
		margin: 0 auto;
		padding: 0 var(--gutter);
		height: 62px;
	}

	.brand {
		font-size: 15px;
		font-weight: 600;
		font-stretch: 88%;
		letter-spacing: 0.06em;
		white-space: nowrap;
	}

	nav.desktop {
		display: none;
		gap: clamp(14px, 1.9vw, 26px);
		font-size: 14px;
		color: var(--muted);
	}

	@media (min-width: 1020px) {
		nav.desktop {
			display: flex;
		}
	}

	nav.desktop a {
		position: relative;
		padding: 4px 0;
		transition: color var(--fast) var(--ease);
	}

	/* Underline sweeps out from the left on hover, and stays put when active. */
	nav.desktop a::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: left;
		transition: transform var(--fast) var(--ease);
	}

	nav.desktop a:hover,
	nav.desktop a:focus-visible {
		color: var(--ink);
	}

	nav.desktop a:hover::after,
	nav.desktop a:focus-visible::after {
		transform: scaleX(1);
	}

	nav.desktop a.active {
		color: var(--ink);
	}

	nav.desktop a.active::after {
		transform: scaleX(1);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		height: 34px;
		padding: 0 16px;
		background: var(--inverse-paper);
		color: var(--inverse-ink);
		font-family: var(--font-mono);
		font-size: 10.5px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		white-space: nowrap;
		transition: opacity var(--fast) var(--ease);
	}

	.cta:hover,
	.cta:focus-visible {
		opacity: 0.84;
	}

	.desktop-only {
		display: none;
	}

	@media (min-width: 640px) {
		.desktop-only {
			display: inline-flex;
		}
	}

	.menu-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		padding: 0;
		border: 1px solid var(--rule);
		background: transparent;
		color: var(--ink);
		cursor: pointer;
	}

	.menu-button:hover {
		border-color: var(--rule-strong);
	}

	@media (min-width: 1020px) {
		.menu-button {
			display: none;
		}
	}

	nav.mobile {
		display: flex;
		flex-direction: column;
		padding: 8px var(--gutter) 24px;
		border-top: 1px solid var(--rule);
	}

	nav.mobile a {
		padding: 14px 0;
		border-bottom: 1px solid var(--rule);
		font-size: 19px;
		font-stretch: 92%;
		letter-spacing: -0.01em;
		color: var(--muted);
		opacity: 0;
		animation: slide-in var(--slow) var(--ease) var(--stagger) forwards;
	}

	nav.mobile a.active {
		color: var(--ink);
	}

	.mobile-cta {
		justify-content: center;
		margin-top: 18px;
		height: 46px;
		border-bottom: none;
		font-size: 11px;
	}

	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(-6px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	@media (prefers-reduced-motion: reduce) {
		nav.mobile a {
			opacity: 1;
			animation: none;
		}
	}
</style>
