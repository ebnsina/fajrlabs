<script lang="ts">
	import { page } from '$app/state';
	import Seo from '#lib/components/Seo.svelte';
	import Button from '#lib/components/Button.svelte';
	import { site } from '#lib/content/site.js';

	// One friendly explanation per situation, rather than a status code on a blank page.
	const copy = $derived.by(() => {
		if (page.status === 404) {
			return {
				title: 'That page is not here.',
				body: 'The link may be old, or we may have moved something. Nothing is broken — you just need a different door.'
			};
		}

		if (page.status === 429) {
			return {
				title: 'That was a lot of requests at once.',
				body: 'Give it a minute and try again. If you were not doing anything unusual, let us know.'
			};
		}

		if (page.status >= 500) {
			return {
				title: 'Something went wrong at our end.',
				body: 'Not your fault, and we have been told about it. Try again in a moment, or email us and we will sort it out.'
			};
		}

		return {
			title: 'We could not load that.',
			body: page.error?.message ?? 'Try again, or head back to somewhere familiar.'
		};
	});
</script>

<Seo title={copy.title} description={copy.body} noindex />

<section>
	<div class="rail">
		<span class="label">Error {page.status}</span>
		<div class="content">
			<h1>{copy.title}</h1>
			<p class="body">{copy.body}</p>

			<div class="actions">
				<Button href="/" withArrow>Back to the home page</Button>
				<Button href="/contact" variant="ghost">Tell us about it</Button>
			</div>

			<nav aria-label="Suggested pages">
				<span class="nav-label">Or try one of these</span>
				<ul>
					<li><a href="/services">What we build</a></li>
					<li><a href="/halal-by-design">Our standard</a></li>
					<li><a href="/process">How we work</a></li>
					<li><a href="/faq">Common questions</a></li>
				</ul>
			</nav>

			{#if page.status >= 500 && page.error?.reference}
				<p class="reference">
					If you get in touch, quote <code>{page.error.reference}</code> and we can find exactly
					what happened. Or email <a href="mailto:{site.email}">{site.email}</a>.
				</p>
			{/if}
		</div>
	</div>
</section>

<style>
	section {
		padding-block: clamp(56px, 9vw, 120px) clamp(48px, 8vw, 104px);
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
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--faint);
		padding-top: 12px;
		opacity: 0;
		transition: opacity 0.35s var(--ease);
	}

	/* Focus-within keeps the label reachable when tabbing rather than pointing. */
	section:hover .label,
	section:focus-within .label {
		opacity: 1;
	}

	/* Nothing hovers on a touch screen, so the label simply stays. */
	@media (hover: none), (pointer: coarse) {
		.label {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.label {
			transition: none;
		}
	}

	h1 {
		margin: 0;
		max-width: 16ch;
		font-size: clamp(34px, 5.6vw, 66px);
		font-stretch: 86%;
		letter-spacing: -0.034em;
		line-height: 1;
	}

	.body {
		margin: 22px 0 0;
		max-width: 48ch;
		font-size: clamp(15.5px, 1.5vw, 18px);
		color: var(--muted);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 32px;
	}

	nav {
		margin-top: 44px;
		padding-top: 22px;
		border-top: 1px solid var(--rule);
	}

	.nav-label {
		font-family: var(--font-mono);
		font-size: 10.5px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--faint);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 26px;
		margin: 14px 0 0;
		padding: 0;
		list-style: none;
	}

	ul a {
		font-size: 15px;
		color: var(--muted);
		border-bottom: 1px solid transparent;
		transition:
			color var(--fast) var(--ease),
			border-color var(--fast) var(--ease);
	}

	ul a:hover,
	ul a:focus-visible {
		color: var(--ink);
		border-color: var(--ink);
	}

	.reference {
		margin: 32px 0 0;
		max-width: var(--measure);
		font-size: 13.5px;
		color: var(--faint);
	}

	code {
		font-family: var(--font-mono);
		font-size: 12.5px;
		padding: 2px 6px;
		border: 1px solid var(--rule);
		color: var(--ink);
	}

	.reference a {
		border-bottom: 1px solid var(--rule-strong);
	}
</style>
