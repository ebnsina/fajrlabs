<script lang="ts">
	import { footerNav, site } from '#lib/content/site.js';
	import Wordmark from './Wordmark.svelte';
	import { services } from '#lib/content/services.js';

	const year = new Date().getFullYear();
</script>

<footer>
	<div class="inner">
		<div class="lead">
			<Wordmark />
			<p>{site.description}</p>
			<a class="mail" href="mailto:{site.email}">{site.email}</a>
		</div>

		<nav aria-label="Services">
			<h2>What we build</h2>
			<ul>
				{#each services as service (service.slug)}
					<li><a href="/services/{service.slug}">{service.name}</a></li>
				{/each}
			</ul>
		</nav>

		{#each footerNav as group (group.heading)}
			<nav aria-label={group.heading}>
				<h2>{group.heading}</h2>
				<ul>
					{#each group.links as link (link.href)}
						<li><a href={link.href}>{link.label}</a></li>
					{/each}
				</ul>
			</nav>
		{/each}
	</div>

	<div class="baseline">
		<span>© {year} {site.name}</span>
		<span>{site.location}</span>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--rule);
		margin-top: clamp(64px, 10vw, 128px);
	}

	.inner,
	.baseline {
		max-width: 1240px;
		margin: 0 auto;
		padding-inline: var(--gutter);
	}

	.inner {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 36px;
		padding-block: clamp(40px, 6vw, 72px);
	}

	@media (min-width: 760px) {
		.inner {
			grid-template-columns: minmax(0, 1.6fr) repeat(3, minmax(0, 1fr));
			gap: 40px;
		}
	}

	.lead {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 14px;
		max-width: 38ch;
	}

	.lead p {
		margin: 0;
		font-size: 14.5px;
		color: var(--muted);
	}

	.mail {
		font-family: var(--font-mono);
		font-size: 12.5px;
		border-bottom: 1px solid var(--rule-strong);
		padding-bottom: 2px;
		transition: border-color var(--fast) var(--ease);
	}

	.mail:hover,
	.mail:focus-visible {
		border-color: var(--ink);
	}

	h2 {
		margin: 0 0 14px;
		font-family: var(--font-mono);
		font-size: 10.5px;
		font-weight: 400;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--faint);
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 9px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li a {
		font-size: 14.5px;
		color: var(--muted);
		transition: color var(--fast) var(--ease);
	}

	li a:hover,
	li a:focus-visible {
		color: var(--ink);
	}

	.baseline {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 10px;
		padding-block: 20px 32px;
		border-top: 1px solid var(--rule);
		font-family: var(--font-mono);
		font-size: 10.5px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--faint);
	}
</style>
