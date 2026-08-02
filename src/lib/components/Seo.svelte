<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib/content/site.js';

	type Props = {
		title: string;
		description: string;
		/** Set for article pages so social previews use the right card type. */
		type?: 'website' | 'article';
		publishedAt?: string;
		noindex?: boolean;
		/**
		 * Overrides the default social card. Give the real dimensions — a picture
		 * declared at a size it is not gets cropped unpredictably by each network.
		 */
		image?: { src: string; width: number; height: number; alt: string };
		/** Extra JSON-LD for this page, on top of the sitewide organisation entry. */
		schema?: Record<string, unknown>[];
	};

	let {
		title,
		description,
		type = 'website',
		publishedAt,
		noindex = false,
		image,
		schema = []
	}: Props = $props();

	// The home page uses the bare brand name; every other page is suffixed.
	const fullTitle = $derived(
		page.url.pathname === '/' ? `${site.name} — ${site.tagline}` : `${title} — ${site.name}`
	);
	const canonical = $derived(new URL(page.url.pathname, site.url).href);
	const card = $derived(
		image ?? {
			src: '/og.png',
			width: 1200,
			height: 630,
			alt: `${site.name} — ${site.tagline}`
		}
	);
	const ogImage = $derived(new URL(card.src, site.url).href);

	const baseSchema = $derived([
		{
			'@type': 'Organization',
			'@id': `${site.url}/#organization`,
			name: site.name,
			url: site.url,
			email: site.email,
			description: site.description,
			foundingDate: site.founded,
			logo: new URL('/icon-512.png', site.url).href,
			// The number is for WhatsApp, so it is described as a messaging contact
			// rather than a bare telephone, which would invite calls instead.
			contactPoint: [
				{
					'@type': 'ContactPoint',
					contactType: 'customer support',
					email: site.email,
					telephone: site.whatsapp.tel,
					url: site.whatsapp.href,
					availableLanguage: ['English', 'Bengali'],
					areaServed: 'Worldwide'
				}
			],
			sameAs: [site.whatsapp.href],
			// The studio's defining characteristic, stated where machines can read it.
			knowsAbout: [
				'Custom software development',
				'Mobile app development',
				'Software plugins and extensions',
				'Practical AI automation',
				'Halal-compliant software development'
			]
		},
		{
			'@type': 'WebSite',
			'@id': `${site.url}/#website`,
			url: site.url,
			name: site.name,
			description: site.description,
			publisher: { '@id': `${site.url}/#organization` },
			inLanguage: 'en-GB'
		}
	]);

	// Escaping every `<` stops a closing script tag inside any value from
	// terminating the block early.
	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [...baseSchema, ...schema]
		}).replace(/</g, '\\u003c')
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}
		<meta name="robots" content="noindex, follow" />
	{/if}

	<meta property="og:site_name" content={site.name} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:alt" content={card.alt} />
	<meta property="og:image:width" content={String(card.width)} />
	<meta property="og:image:height" content={String(card.height)} />
	<meta property="og:locale" content="en_GB" />
	{#if publishedAt}
		<meta property="article:published_time" content={publishedAt} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:image:alt" content={card.alt} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags, no-useless-escape -- jsonLd is JSON.stringify output with every `<` escaped, so it cannot carry markup; the closing tag must stay escaped or it terminates this block -->
	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>
