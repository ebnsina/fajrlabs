<script lang="ts">
	import { HugeiconsIcon, Moon02Icon, Sun03Icon } from '#lib/icons.js';
	import { theme } from '#lib/theme.svelte.js';

	const isDark = $derived(theme.current === 'dark');
</script>

<button
	type="button"
	onclick={() => theme.toggle()}
	aria-pressed={isDark}
	title={isDark ? 'Switch to light appearance' : 'Switch to dark appearance'}
>
	<span class="icon" aria-hidden="true">
		{#if isDark}
			<HugeiconsIcon icon={Sun03Icon} size={16} strokeWidth={1.8} />
		{:else}
			<HugeiconsIcon icon={Moon02Icon} size={16} strokeWidth={1.8} />
		{/if}
	</span>
	<span class="sr-only">
		{isDark ? 'Switch to light appearance' : 'Switch to dark appearance'}
	</span>
</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		padding: 0;
		border: 1px solid var(--rule);
		background: transparent;
		color: var(--muted);
		cursor: pointer;
		transition:
			color var(--fast) var(--ease),
			border-color var(--fast) var(--ease);
	}

	button:hover {
		color: var(--ink);
		border-color: var(--rule-strong);
	}

	.icon {
		display: grid;
		place-items: center;
		transition: transform var(--slow) var(--ease);
	}

	button:hover .icon {
		transform: rotate(-18deg);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
</style>
