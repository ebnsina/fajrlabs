<script lang="ts">
	import { HugeiconsIcon, Tick02Icon, Alert02Icon } from '#lib/icons.js';
	import Seo from '#lib/components/Seo.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import Section from '#lib/components/Section.svelte';
	import { submitEnquiry } from './contact.remote.ts';
	import { enquirySchema, enquiryOptions } from '#lib/schemas/enquiry.js';
	import { site } from '#lib/content/site.js';

	// The same schema runs in the browser, so problems show before anything is sent.
	const enquiryForm = submitEnquiry.preflight(enquirySchema);

	const formAttributes = enquiryForm.enhance(async (event) => {
		await event.submit();
		if (enquiryForm.result?.ok) event.element.reset();
	});

	const fields = $derived(enquiryForm.fields);
	const result = $derived(enquiryForm.result);
	const sending = $derived(enquiryForm.pending > 0);

	// Names both ways of reaching the studio where a machine will read them.
	const contactSchema = [
		{
			'@type': 'ContactPage',
			'@id': `${site.url}/contact#page`,
			name: 'Start a project',
			about: { '@id': `${site.url}/#organization` },
			mainEntity: {
				'@type': 'ContactPoint',
				contactType: 'sales',
				email: site.email,
				telephone: site.whatsapp.tel,
				url: site.whatsapp.href,
				availableLanguage: ['English', 'Bengali'],
				areaServed: 'Worldwide'
			}
		}
	];
</script>

<Seo
	title="Start a project"
	description="Tell us what you are trying to build. Half an hour on a call, no charge and no obligation — and a reply within one working day."
	schema={contactSchema}
/>

<PageHeader
	eyebrow="Start a project"
	title="Tell us what you are trying to build."
	standfirst="No sales sequence, no filling this in three times. One person reads it, and you get a straight answer within a working day — including if that answer is no."
/>

<Section label="Your enquiry">
	<div class="layout">
		<form {...formAttributes} novalidate>
			<div class="pair">
				<div class="field">
					<label for="name">Your name</label>
					{#if fields.name.issues()?.[0]}
						<p class="issue" id="name-issue">{fields.name.issues()?.[0].message}</p>
					{/if}
					<!-- describedby follows the spread so the field's own attributes cannot drop it. -->
					<input
						id="name"
						autocomplete="name"
						{...fields.name.as('text')}
						aria-describedby={fields.name.issues()?.[0] ? 'name-issue' : undefined}
					/>
				</div>

				<div class="field">
					<label for="email">Email</label>
					{#if fields.email.issues()?.[0]}
						<p class="issue" id="email-issue">{fields.email.issues()?.[0].message}</p>
					{/if}
					<input
						id="email"
						autocomplete="email"
						{...fields.email.as('email')}
						aria-describedby={fields.email.issues()?.[0] ? 'email-issue' : undefined}
					/>
				</div>
			</div>

			<div class="pair">
				<div class="field">
					<label for="organisation">Organisation <span class="optional">optional</span></label>
					{#if fields.organisation.issues()?.[0]}
						<p class="issue" id="organisation-issue">{fields.organisation.issues()?.[0].message}</p>
					{/if}
					<input
						id="organisation"
						autocomplete="organization"
						{...fields.organisation.as('text')}
						aria-describedby={fields.organisation.issues()?.[0] ? 'organisation-issue' : undefined}
					/>
				</div>

				<div class="field">
					<label for="service">What do you need?</label>
					{#if fields.service.issues()?.[0]}
						<p class="issue" id="service-issue">{fields.service.issues()?.[0].message}</p>
					{/if}
					<select
						id="service"
						{...fields.service.as('select')}
						aria-describedby={fields.service.issues()?.[0] ? 'service-issue' : undefined}
					>
						<option value="">Choose one</option>
						{#each enquiryOptions as option (option.value)}
							<option value={option.value}>{option.label}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="field">
				<label for="message">About the project</label>
				<p class="hint" id="message-hint">
					What is going wrong today, or what you would like to exist. A few sentences is plenty.
				</p>
				{#if fields.message.issues()?.[0]}
					<p class="issue" id="message-issue">{fields.message.issues()?.[0].message}</p>
				{/if}
				<textarea
					id="message"
					rows="7"
					{...fields.message.as('text')}
					aria-describedby={fields.message.issues()?.[0]
						? 'message-issue message-hint'
						: 'message-hint'}></textarea>
			</div>

			<div class="trap" aria-hidden="true">
				<label for="website">Leave this empty</label>
				<input id="website" tabindex="-1" autocomplete="off" {...fields.website.as('text')} />
			</div>

			<div class="submit">
				<button type="submit" disabled={sending}>
					{sending ? 'Sending…' : 'Send enquiry'}
				</button>
				<p class="reassure">We reply within one working day. We never pass your details on.</p>
			</div>

			<div class="status" role="status" aria-live="polite">
				{#if result}
					<div class="banner" class:good={result.ok} class:bad={!result.ok}>
						<span class="banner-icon" aria-hidden="true">
							{#if result.ok}
								<HugeiconsIcon icon={Tick02Icon} size={15} strokeWidth={2.2} />
							{:else}
								<HugeiconsIcon icon={Alert02Icon} size={15} strokeWidth={1.9} />
							{/if}
						</span>
						<p>{result.message}</p>
					</div>
				{/if}
			</div>
		</form>

		<aside>
			<h2>Prefer to message?</h2>
			<p>
				Write to <a href="mailto:{site.email}">{site.email}</a>, or send a message on
				<a href={site.whatsapp.href} rel="noopener">WhatsApp</a> ({site.whatsapp.display}). Both
				reach the same person.
			</p>

			<h2>What happens next</h2>
			<ol>
				<li>We read it and reply within one working day.</li>
				<li>If it looks like a fit, we book half an hour to talk it through.</li>
				<li>You get a written plan and a fixed price, usually within a week.</li>
			</ol>

			<h2>Before you write</h2>
			<p>
				Worth a quick look at <a href="/halal-by-design">the standard we work to</a>. If your
				project sits outside it, you will hear so quickly.
			</p>
		</aside>
	</div>
</Section>

<style>
	.layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 40px;
	}

	@media (min-width: 940px) {
		.layout {
			grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
			gap: 56px;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 22px;
	}

	.pair {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 22px;
	}

	@media (min-width: 620px) {
		.pair {
			grid-template-columns: 1fr 1fr;
		}
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 7px;
	}

	label {
		font-family: var(--font-mono);
		font-size: 10.5px;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: var(--muted);
	}

	.optional {
		color: var(--faint);
		text-transform: none;
		letter-spacing: 0.04em;
	}

	.hint {
		margin: -2px 0 0;
		font-size: 13.5px;
		color: var(--faint);
	}

	.issue {
		margin: 0;
		font-size: 13.5px;
		color: var(--ink);
		border-left: 2px solid var(--ink);
		padding-left: 10px;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 12px 14px;
		border: 1px solid var(--rule-strong);
		border-radius: 0;
		background: var(--paper);
		color: var(--ink);
		font-family: var(--font-sans);
		font-size: 15.5px;
		transition:
			border-color var(--fast) var(--ease),
			background-color var(--fast) var(--ease);
	}

	textarea {
		resize: vertical;
		min-height: 150px;
	}

	input:hover,
	select:hover,
	textarea:hover {
		border-color: var(--muted);
	}

	/* No outline reset here: the global focus ring has to survive on these too. */
	input:focus,
	select:focus,
	textarea:focus {
		border-color: var(--ink);
		box-shadow: inset 0 0 0 1px var(--ink);
	}

	:global(input[aria-invalid='true']),
	:global(select[aria-invalid='true']),
	:global(textarea[aria-invalid='true']) {
		border-color: var(--ink);
		background: var(--surface);
	}

	.trap {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.submit {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px;
		padding-top: 4px;
	}

	button {
		height: 48px;
		padding-inline: 26px;
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

	button:hover:not(:disabled) {
		opacity: 0.85;
	}

	button:disabled {
		opacity: 0.55;
		cursor: progress;
	}

	.reassure {
		margin: 0;
		font-size: 13px;
		color: var(--faint);
	}

	.status:empty {
		display: none;
	}

	.banner {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 16px 18px;
		border: 1px solid var(--rule-strong);
		background: var(--surface);
		animation: rise var(--slow) var(--ease);
	}

	.banner.good {
		border-color: var(--ink);
	}

	.banner-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.banner p {
		margin: 0;
		font-size: 14.5px;
	}

	aside h2 {
		margin: 0 0 8px;
		font-family: var(--font-mono);
		font-size: 10.5px;
		font-weight: 400;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--faint);
	}

	aside h2 ~ h2 {
		margin-top: 28px;
	}

	aside p {
		margin: 0;
		font-size: 14.5px;
		color: var(--muted);
	}

	aside ol {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
		list-style: none;
		counter-reset: steps;
	}

	aside ol li {
		display: grid;
		grid-template-columns: 28px minmax(0, 1fr);
		gap: 10px;
		padding: 9px 0;
		border-top: 1px solid var(--rule);
		font-size: 14.5px;
		color: var(--muted);
		counter-increment: steps;
	}

	aside ol li:first-child {
		border-top: none;
	}

	aside ol li::before {
		content: counter(steps, decimal-leading-zero);
		font-family: var(--font-mono);
		font-size: 10.5px;
		font-variant-numeric: tabular-nums;
		color: var(--faint);
		padding-top: 4px;
	}

	aside a {
		border-bottom: 1px solid var(--rule-strong);
		padding-bottom: 1px;
		color: var(--ink);
		transition: border-color var(--fast) var(--ease);
	}

	aside a:hover,
	aside a:focus-visible {
		border-color: var(--ink);
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}
</style>
