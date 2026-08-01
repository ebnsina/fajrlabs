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
	};

	let { title, description, type = 'website', publishedAt, noindex = false }: Props = $props();

	// The home page uses the bare brand name; every other page is suffixed.
	const fullTitle = $derived(
		page.url.pathname === '/' ? `${site.name} — ${site.tagline}` : `${title} — ${site.name}`
	);
	const canonical = $derived(new URL(page.url.pathname, site.url).href);
	const ogImage = $derived(new URL('/og.png', site.url).href);
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
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="en_GB" />
	{#if publishedAt}
		<meta property="article:published_time" content={publishedAt} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>
