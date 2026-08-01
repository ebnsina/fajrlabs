<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import { HugeiconsIcon, Tick02Icon } from '#lib/icons.js';
	import { designSystem, designSystemMarkdown } from '#lib/content/design-system.js';

	let copied = $state(false);
	let failed = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	async function copy() {
		clearTimeout(timer);
		try {
			await navigator.clipboard.writeText(designSystemMarkdown());
			copied = true;
			failed = false;
		} catch {
			// Clipboard access can be refused; the textarea below is the way out.
			failed = true;
			copied = false;
		}
		timer = setTimeout(() => {
			copied = false;
			failed = false;
		}, 2600);
	}
</script>

<Seo
	title="Design system"
	description="The rules this site is built on, in a form you can hand to a language model."
	noindex
/>

<PageHeader
	eyebrow="Reference"
	title="The design system."
	standfirst="Every rule this site is built on, written once and used twice: rendered below, and copied as Markdown so you can hand it to a model and get back something that matches."
>
	{#snippet actions()}
		<button type="button" class="copy" onclick={copy}>
			{#if copied}
				<span class="tick" aria-hidden="true">
					<HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={2.2} />
				</span>
				Copied
			{:else if failed}
				Press ⌘C below
			{:else}
				Copy as Markdown
			{/if}
		</button>
		<span class="status" role="status" aria-live="polite">
			{#if copied}The design system is on your clipboard.{/if}
			{#if failed}Copying was blocked, so the text is selected below instead.{/if}
		</span>
	{/snippet}
</PageHeader>

<Section label="In short">
	<p class="lead">{designSystem.summary}</p>
</Section>

<Section label="Principles">
	<ul class="principles">
		{#each designSystem.principles as principle (principle.title)}
			<li>
				<h2>{principle.title}</h2>
				<p>{principle.detail}</p>
			</li>
		{/each}
	</ul>
</Section>

<Section label="Colour">
	<p class="note">{designSystem.colour.note}</p>
	<div class="scroll">
		<table>
			<thead>
				<tr><th>Token</th><th>Light</th><th>Dark</th><th>Use</th></tr>
			</thead>
			<tbody>
				{#each designSystem.colour.tokens as token (token.name)}
					<tr>
						<td><code>{token.name}</code></td>
						<td>
							<span class="swatch" style="background: {token.light}"></span>
							<code>{token.light}</code>
						</td>
						<td>
							<span class="swatch" style="background: {token.dark}"></span>
							<code>{token.dark}</code>
						</td>
						<td class="use">{token.use}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Section>

<Section label="Typography">
	<ul class="families">
		{#each designSystem.typography.families as family (family.name)}
			<li>
				<h3>{family.name}</h3>
				<p class="role">{family.role}</p>
				<p>{family.detail}</p>
			</li>
		{/each}
	</ul>

	<div class="scroll">
		<table>
			<thead>
				<tr><th>Role</th><th>Specification</th></tr>
			</thead>
			<tbody>
				{#each designSystem.typography.scale as step (step.role)}
					<tr><td>{step.role}</td><td class="use">{step.spec}</td></tr>
				{/each}
			</tbody>
		</table>
	</div>

	<ul class="rules">
		{#each designSystem.typography.rules as rule (rule)}<li>{rule}</li>{/each}
	</ul>
</Section>

<Section label="Layout">
	<div class="scroll">
		<table>
			<thead>
				<tr><th>Token</th><th>Value</th><th>Use</th></tr>
			</thead>
			<tbody>
				{#each designSystem.layout.tokens as token (token.name)}
					<tr>
						<td><code>{token.name}</code></td>
						<td><code>{token.value}</code></td>
						<td class="use">{token.use}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<ul class="rules">
		{#each designSystem.layout.rules as rule (rule)}<li>{rule}</li>{/each}
	</ul>
</Section>

<Section label="Motion">
	<ul class="rules">
		{#each designSystem.motion.rules as rule (rule)}<li>{rule}</li>{/each}
	</ul>
</Section>

<Section label="Components">
	<ul class="principles">
		{#each designSystem.components as component (component.name)}
			<li>
				<h3>{component.name}</h3>
				<p>{component.detail}</p>
			</li>
		{/each}
	</ul>
</Section>

<Section label="Iconography">
	<ul class="rules">
		{#each designSystem.iconography.rules as rule (rule)}<li>{rule}</li>{/each}
	</ul>
</Section>

<Section label="Voice">
	<ul class="rules">
		{#each designSystem.voice.rules as rule (rule)}<li>{rule}</li>{/each}
	</ul>
</Section>

<Section label="Raw Markdown">
	<p class="note">
		The same text the button copies. Select and copy it by hand if the clipboard is blocked.
	</p>
	<textarea readonly rows="30" aria-label="Design system as Markdown"
		>{designSystemMarkdown()}</textarea
	>
</Section>

<style>
	.copy {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		height: 46px;
		padding-inline: 22px;
		border: 1px solid var(--inverse-paper);
		background: var(--inverse-paper);
		color: var(--inverse-ink);
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		cursor: pointer;
		transition: opacity var(--fast) var(--ease);
	}

	.copy:hover {
		opacity: 0.85;
	}

	.tick {
		display: grid;
		place-items: center;
	}

	.status {
		align-self: center;
		font-size: 13.5px;
		color: var(--muted);
	}

	.lead {
		margin: 0;
		max-width: var(--measure);
		font-size: clamp(17px, 1.9vw, 21px);
		line-height: 1.55;
	}

	.note {
		margin: 0 0 26px;
		max-width: var(--measure);
		font-size: 14.5px;
		color: var(--muted);
	}

	.principles,
	.families,
	.rules {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.principles {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 28px 48px;
	}

	@media (min-width: 720px) {
		.principles {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.principles h2,
	.principles h3 {
		margin: 0;
		font-size: 18px;
		font-stretch: 92%;
		letter-spacing: -0.016em;
	}

	.principles p {
		margin: 6px 0 0;
		font-size: 14.5px;
		color: var(--muted);
	}

	.families {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 26px 44px;
		margin-bottom: 40px;
	}

	@media (min-width: 760px) {
		.families {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.families h3 {
		margin: 0;
		font-size: 16.5px;
		font-stretch: 94%;
	}

	.role {
		margin: 6px 0 0;
		font-family: var(--font-mono);
		font-size: 10.5px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--faint);
	}

	.families p:last-child {
		margin: 8px 0 0;
		font-size: 14px;
		color: var(--muted);
	}

	.rules {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 14px 48px;
	}

	@media (min-width: 720px) {
		.rules {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.rules li {
		font-size: 15px;
		color: var(--muted);
	}

	.scroll {
		overflow-x: auto;
		margin-bottom: 34px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
	}

	th {
		padding: 0 16px 10px 0;
		border-bottom: 1px solid var(--rule);
		font-family: var(--font-mono);
		font-size: 10.5px;
		font-weight: 400;
		letter-spacing: 0.14em;
		text-align: left;
		text-transform: uppercase;
		color: var(--faint);
		white-space: nowrap;
	}

	td {
		padding: 12px 16px 12px 0;
		border-bottom: 1px solid var(--rule);
		vertical-align: middle;
		white-space: nowrap;
	}

	.use {
		color: var(--muted);
		white-space: normal;
	}

	code {
		font-family: var(--font-mono);
		font-size: 12.5px;
	}

	.swatch {
		display: inline-block;
		width: 14px;
		height: 14px;
		margin-right: 8px;
		vertical-align: -2px;
		border: 1px solid var(--rule-strong);
	}

	textarea {
		width: 100%;
		min-height: 70vh;
		padding: 20px 22px;
		border: 1px solid var(--rule-strong);
		border-radius: 0;
		background: var(--surface);
		color: var(--ink);
		font-family: var(--font-mono);
		font-size: 12.5px;
		line-height: 1.6;
		resize: vertical;
	}
</style>
