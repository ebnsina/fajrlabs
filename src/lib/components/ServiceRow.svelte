<script lang="ts">
	import { HugeiconsIcon, ArrowUpRight01Icon, serviceIcons } from '#lib/icons.js';
	import type { Service } from '#lib/content/services.js';

	let { service }: { service: Service } = $props();
</script>

<a class="row" href="/services/{service.slug}">
	<span class="mark" aria-hidden="true">
		<HugeiconsIcon icon={serviceIcons[service.slug]} size={19} strokeWidth={1.6} />
	</span>
	<span class="body">
		<span class="name">{service.name}</span>
		<span class="line">{service.oneLine}</span>
	</span>
	<span class="meta">
		<span class="timeline">{service.duration}</span>
		<span class="arrow" aria-hidden="true"
			><HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={1.8} /></span
		>
	</span>
</a>

<style>
	.row {
		display: grid;
		grid-template-columns: 40px minmax(0, 1fr) auto;
		align-items: center;
		gap: 20px;
		padding: 22px 0;
		border-top: 1px solid var(--rule);
		transition: padding-inline var(--slow) var(--ease);
	}

	.row:first-child {
		padding-top: 0;
		border-top: none;
	}

	.mark {
		display: grid;
		place-items: center;
		width: 38px;
		height: 38px;
		border: 1px solid var(--rule);
		color: var(--muted);
		transition:
			border-color var(--fast) var(--ease),
			color var(--fast) var(--ease),
			background-color var(--fast) var(--ease);
	}

	.row:hover .mark,
	.row:focus-visible .mark {
		border-color: var(--ink);
		background: var(--ink);
		color: var(--paper);
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 5px;
		min-width: 0;
	}

	.name {
		font-size: clamp(22px, 3vw, 32px);
		font-weight: 700;
		font-stretch: 90%;
		letter-spacing: -0.024em;
		line-height: 1.1;
	}

	.line {
		max-width: 54ch;
		font-size: 14.5px;
		color: var(--muted);
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 18px;
	}

	.timeline {
		display: none;
		font-family: var(--font-mono);
		font-size: 11px;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.06em;
		color: var(--faint);
	}

	@media (min-width: 700px) {
		.timeline {
			display: inline;
		}
	}

	.arrow {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border: 1px solid var(--rule);
		color: var(--muted);
		transition:
			transform var(--fast) var(--ease),
			border-color var(--fast) var(--ease),
			color var(--fast) var(--ease);
	}

	/* The whole row nudges right and the arrow lifts — one gesture, not three. */
	.row:hover,
	.row:focus-visible {
		padding-inline: 10px;
	}

	.row:hover .arrow,
	.row:focus-visible .arrow {
		transform: translate(3px, -3px);
		border-color: var(--ink);
		color: var(--ink);
	}

	.row:hover .timeline,
	.row:focus-visible .timeline {
		color: var(--muted);
	}

	@media (prefers-reduced-motion: reduce) {
		.row:hover,
		.row:focus-visible {
			padding-inline: 0;
		}
	}
</style>
