<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import { reveal } from '#lib/motion.js';
	import { changelog } from '#lib/content/changelog.js';
	import { formatDate, isoDate } from '#lib/utils/format.js';
</script>

<Seo title="Changelog" description="What has changed on this site, and when." />

<PageHeader
	eyebrow="Changelog"
	title="What has changed here."
	standfirst="A public record of what changes here. It is easier to trust people who show their working."
/>

<Section label="Releases">
	<ol class="releases" {@attach reveal()}>
		{#each changelog as entry (entry.version)}
			<li>
				<div class="meta">
					<span class="version">{entry.version}</span>
					<time datetime={isoDate(entry.date)}>{formatDate(entry.date)}</time>
				</div>
				<div class="body">
					<h2>{entry.summary}</h2>
					<ul>
						{#each entry.changes as change (change.note)}
							<li>
								<span class="kind">{change.kind}</span>
								<span>{change.note}</span>
							</li>
						{/each}
					</ul>
				</div>
			</li>
		{/each}
	</ol>
</Section>

<style>
	.releases {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.releases > li {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 14px;
		padding: 26px 0;
		border-top: 1px solid var(--rule);
	}

	@media (min-width: 720px) {
		.releases > li {
			grid-template-columns: 160px minmax(0, 1fr);
			gap: 32px;
		}
	}

	.releases > li:first-child {
		border-top: none;
		padding-top: 0;
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 4px;
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
	}

	.version {
		font-size: 15px;
		letter-spacing: 0.02em;
	}

	.meta time {
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--faint);
	}

	.body {
		max-width: var(--measure);
	}

	h2 {
		margin: 0;
		font-size: clamp(19px, 2.3vw, 24px);
		letter-spacing: -0.02em;
		line-height: 1.16;
	}

	.body ul {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin: 20px 0 0;
		padding: 0;
		list-style: none;
	}

	.body ul li {
		display: grid;
		grid-template-columns: 74px minmax(0, 1fr);
		gap: 14px;
		font-size: 14.5px;
	}

	.kind {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--faint);
		padding-top: 4px;
	}
</style>
