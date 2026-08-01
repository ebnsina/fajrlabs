<script lang="ts">
	import type { Snippet } from 'svelte';
	import { HugeiconsIcon, ArrowRight02Icon } from '#lib/icons.js';
	import { magnetic } from '#lib/motion.js';

	type Props = {
		href?: string;
		variant?: 'solid' | 'ghost';
		type?: 'button' | 'submit';
		disabled?: boolean;
		withArrow?: boolean;
		onclick?: () => void;
		children: Snippet;
	};

	let {
		href,
		variant = 'solid',
		type = 'button',
		disabled = false,
		withArrow = false,
		onclick,
		children
	}: Props = $props();
</script>

{#snippet inner()}
	<span class="text">{@render children()}</span>
	{#if withArrow}
		<span class="arrow" aria-hidden="true">
			<HugeiconsIcon icon={ArrowRight02Icon} size={15} strokeWidth={2} />
		</span>
	{/if}
{/snippet}

{#if href}
	<a class="btn {variant}" class:has-arrow={withArrow} {href} {@attach magnetic()}>
		{@render inner()}
	</a>
{:else}
	<button
		class="btn {variant}"
		class:has-arrow={withArrow}
		{type}
		{disabled}
		{onclick}
		{@attach magnetic()}
	>
		{@render inner()}
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		height: 46px;
		padding-inline: 22px;
		border: 1px solid transparent;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		cursor: pointer;
		transition:
			background-color var(--fast) var(--ease),
			border-color var(--fast) var(--ease),
			color var(--fast) var(--ease),
			opacity var(--fast) var(--ease);
	}

	.solid {
		background: var(--inverse-paper);
		border-color: var(--inverse-paper);
		color: var(--inverse-ink);
	}

	.solid:hover:not(:disabled),
	.solid:focus-visible:not(:disabled) {
		opacity: 0.85;
	}

	.ghost {
		background: transparent;
		border-color: var(--rule-strong);
		color: var(--ink);
	}

	.ghost:hover:not(:disabled),
	.ghost:focus-visible:not(:disabled) {
		border-color: var(--ink);
		background: var(--surface);
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.arrow {
		display: grid;
		place-items: center;
		transition: transform var(--fast) var(--ease);
	}

	.btn:hover:not(:disabled) .arrow,
	.btn:focus-visible:not(:disabled) .arrow {
		transform: translateX(4px);
	}
</style>
