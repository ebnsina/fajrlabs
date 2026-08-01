<script lang="ts">
	import Button from './Button.svelte';
	import { site } from '#lib/content/site.js';

	type Props = {
		title?: string;
		body?: string;
	};

	let {
		title = 'Tell us what you are trying to build.',
		body = 'Half an hour, free, no obligation. If we are not the right people we will say so and point you somewhere better.'
	}: Props = $props();
</script>

<aside>
	<div class="inner">
		<div class="copy">
			<h2>{title}</h2>
			<p>{body}</p>
		</div>
		<div class="actions">
			<Button href="/contact" withArrow>Start a project</Button>
			<a class="mail" href="mailto:{site.email}">{site.email}</a>
		</div>
	</div>
</aside>

<style>
	aside {
		background: var(--surface);
	}

	.inner {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		align-items: end;
		gap: 28px;
		max-width: 1240px;
		margin: 0 auto;
		padding: clamp(44px, 6vw, 76px) var(--gutter);
	}

	@media (min-width: 860px) {
		.inner {
			grid-template-columns: minmax(0, 1fr) auto;
			gap: 48px;
		}
	}

	h2 {
		margin: 0;
		max-width: 22ch;
		font-size: clamp(26px, 3.6vw, 40px);
		font-stretch: 88%;
		letter-spacing: -0.028em;
		line-height: 1.06;
	}

	p {
		margin: 16px 0 0;
		max-width: 50ch;
		font-size: 15px;
		color: var(--muted);
	}

	.actions {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 14px;
	}

	.mail {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--muted);
		border-bottom: 1px solid var(--rule-strong);
		padding-bottom: 2px;
		transition:
			color var(--fast) var(--ease),
			border-color var(--fast) var(--ease);
	}

	.mail:hover,
	.mail:focus-visible {
		color: var(--ink);
		border-color: var(--ink);
	}
</style>
