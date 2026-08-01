<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		eyebrow: string;
		title: string;
		standfirst?: string;
		actions?: Snippet;
	};

	let { eyebrow, title, standfirst, actions }: Props = $props();
</script>

<header class="page-header">
	<div class="rail">
		<span class="label">{eyebrow}</span>
		<div class="content">
			<h1>{title}</h1>
			{#if standfirst}<p class="standfirst">{standfirst}</p>{/if}
			{#if actions}<div class="actions">{@render actions()}</div>{/if}
		</div>
	</div>
</header>

<style>
	.page-header {
		padding-block: clamp(44px, 7vw, 88px) clamp(36px, 5vw, 64px);
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
		padding-top: 12px;
	}

	h1 {
		margin: 0;
		font-size: clamp(34px, 5.4vw, 62px);
		font-stretch: 86%;
		letter-spacing: -0.032em;
		line-height: 1.02;
		animation: rise var(--slow) var(--ease) both;
	}

	.standfirst {
		margin: 22px 0 0;
		max-width: 52ch;
		font-size: clamp(15.5px, 1.5vw, 18px);
		color: var(--muted);
		animation: rise var(--slow) var(--ease) 70ms both;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 30px;
		animation: rise var(--slow) var(--ease) 140ms both;
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		h1,
		.standfirst,
		.actions {
			animation: none;
		}
	}
</style>
