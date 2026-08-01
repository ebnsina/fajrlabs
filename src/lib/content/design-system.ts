/**
 * The design system, written once and used twice: rendered on /design, and
 * serialised to Markdown by the copy button so it can be handed to a model.
 *
 * Token values mirror `src/routes/layout.css` — change both together.
 */
export type Token = { name: string; light: string; dark: string; use: string };
export type Rule = { title: string; detail: string };

export const designSystem = {
	summary:
		'A monochrome editorial design system for a small software studio. Restrained, typographic, and built on a hairline grid. There is no accent colour anywhere; hierarchy comes from weight, width and space.',

	principles: [
		{
			title: 'Monochrome, without exception',
			detail:
				'No hue is used anywhere, including for state and emphasis. If something needs to stand out, change its weight, size or surrounding space. This is a hard rule.'
		},
		{
			title: 'One typeface, worked hard',
			detail:
				'Mona Sans carries everything, using its width axis (75–125) to do the job a second display family usually would. Geist Mono is reserved for numbers, labels, metadata and anything tabular.'
		},
		{
			title: 'Space before lines',
			detail:
				'Reach for whitespace first. A rule is only justified when it separates two things that would otherwise be confused, and never doubles up with a background change.'
		},
		{
			title: 'Structure must mean something',
			detail:
				'Numbering, eyebrows and dividers encode real structure. Steps are numbered because they are a sequence; services are not numbered because they are not.'
		},
		{
			title: 'Motion is an enhancement',
			detail:
				'Content ships visible and usable. Animation is added on top, loaded on demand, and skipped entirely when the device or the visitor asks for less.'
		}
	] satisfies Rule[],

	colour: {
		note: 'Every value is a neutral with a slight cool bias, so the greys read as chosen rather than inherited. Declared on :root and redefined once under :root[data-theme="dark"].',
		tokens: [
			{ name: '--paper', light: '#ffffff', dark: '#0a0a0c', use: 'Page background' },
			{ name: '--surface', light: '#f7f7f8', dark: '#111114', use: 'Raised or set-apart panels' },
			{ name: '--ink', light: '#0b0b0d', dark: '#ececef', use: 'Primary text' },
			{ name: '--muted', light: '#63636d', dark: '#9797a2', use: 'Secondary text' },
			{ name: '--faint', light: '#94949f', dark: '#6b6b76', use: 'Labels and metadata' },
			{ name: '--rule', light: '#ededf0', dark: '#1c1c21', use: 'Hairline dividers' },
			{
				name: '--rule-strong',
				light: '#dededf',
				dark: '#2b2b32',
				use: 'Borders needing more presence'
			},
			{
				name: '--inverse-paper',
				light: '#0b0b0d',
				dark: '#f4f4f6',
				use: 'Solid button background'
			},
			{ name: '--inverse-ink', light: '#f4f4f6', dark: '#0b0b0d', use: 'Text on a solid button' }
		] satisfies Token[]
	},

	typography: {
		families: [
			{
				name: 'Mona Sans Variable',
				role: 'Everything that is not a number or a label',
				detail: 'Variable: weight 200–900, width 75–125. Self-hosted via Fontsource.'
			},
			{
				name: 'Geist Mono Variable',
				role: 'Numbers, labels, metadata, tabular data',
				detail: 'Always uppercase for labels, with 0.12–0.16em letter-spacing.'
			},
			{
				name: 'System Arabic stack',
				role: 'Quoted scripture and the wordmark hover',
				detail: 'SF Arabic, Geeza Pro, Noto Naskh Arabic. Mona Sans has no Arabic glyphs.'
			}
		],
		scale: [
			{
				role: 'Hero heading',
				spec: 'clamp(40px, 7.2vw, 92px), weight 700, width 86%, tracking -0.038em, line-height 0.97'
			},
			{
				role: 'Page title',
				spec: 'clamp(34px, 5.4vw, 62px), weight 700, width 86%, tracking -0.032em'
			},
			{
				role: 'Section heading',
				spec: 'clamp(24px, 3.2vw, 36px), weight 700, width 88%, tracking -0.026em'
			},
			{ role: 'Body', spec: '15–17px, weight 400, line-height 1.6, max-width 62ch' },
			{ role: 'Rail label', spec: 'Geist Mono 10.5px, uppercase, 0.16em tracking, --faint' },
			{ role: 'Button', spec: 'Geist Mono 11px, uppercase, 0.12em tracking' }
		],
		rules: [
			'Headings are bold (700) and narrowed via the width axis; body text stays at the default width.',
			'Emphasis inside a heading uses a lighter weight at full ink, never a lighter colour.',
			'Numbers use font-variant-numeric: tabular-nums wherever they line up in columns.'
		]
	},

	layout: {
		tokens: [
			{ name: '--gutter', value: 'clamp(20px, 4.4vw, 56px)', use: 'Horizontal page padding' },
			{ name: '--measure', value: '62ch', use: 'Maximum comfortable reading width' },
			{ name: '--rail', value: '152px', use: 'Left label column on wide screens' },
			{ name: 'Container', value: 'max-width 1240px, centred', use: 'Every section' }
		],
		rules: [
			'Sections use a two-column rail grid above 900px: a label column and a content column. Below that they stack.',
			'Rail labels fade in on hover, stay visible on touch devices, and appear on focus-within for keyboard users.',
			'Lists of four items use a 2×2 grid rather than auto-fit, which would strand a fourth item alone on a second row.',
			'Columns that must align across a grid use CSS subgrid, so copy length cannot knock rows out of line.'
		]
	},

	motion: {
		rules: [
			'GSAP is loaded with a dynamic import, so it is absent from the entry chunk and never blocks first paint.',
			'Three capability tiers: none (prefers-reduced-motion, data-saver, 2G), reduced (≤4 cores or ≤4GB, 3G), full.',
			'Animations are additive: content is visible in the HTML and animation only adds movement on top.',
			'A 1.2s failsafe removes the motion class, so a blocked or failed script can never leave content invisible.',
			'Never animate with autoAlpha or visibility: hidden — it removes elements from the tab order and the accessibility tree.',
			'Durations 0.7–0.9s, ease power3.out. Hover transitions 160ms.'
		]
	},

	components: [
		{
			name: 'Button',
			detail:
				'Solid or ghost. 46px tall, mono uppercase label, optional arrow that shifts 4px on hover. Leans toward the pointer (magnetic) on capable devices.'
		},
		{ name: 'Section', detail: 'The rail grid wrapper. Optional label, optional top hairline.' },
		{
			name: 'PageHeader',
			detail: 'Eyebrow, h1, standfirst, optional actions. Used on every page except the home hero.'
		},
		{
			name: 'ServiceRow',
			detail:
				'A full-width link row: icon, name, one-line summary, duration in mono, arrow. The row shifts 10px on hover.'
		},
		{
			name: 'CtaBand',
			detail:
				'Closing call to action on a --surface background. No border; the surface change marks the boundary.'
		},
		{
			name: 'Cursor',
			detail:
				'A mix-blend-mode: difference dot that inverts against the page, growing into a labelled pill over elements carrying data-cursor. Never on touch.'
		},
		{
			name: 'Wordmark',
			detail:
				'Fajr in bold ink, Labs at regular weight in --muted. Hovering swaps Fajr for فَجْر in one grid cell, so nothing shifts.'
		}
	],

	iconography: {
		rules: [
			'HugeIcons, stroke style, 1.5–1.8 stroke width, sized 14–26px.',
			'A bordered box means an interactive control. A bare glyph is a decorative marker. Never mix the two for the same thing.'
		]
	},

	voice: {
		rules: [
			'Plain language for a business owner, not a developer. No jargon: no stack, API, scalable, leverage, seamless, robust, solutions.',
			'Punchy, not explanatory. Short sentences, strongest line first. It should sell, not describe.',
			'Confident, never boastful. No exclamation marks.',
			'Invent nothing: no clients, testimonials, statistics, awards or team facts unless given.',
			'Errors say what went wrong and what to do next, in one sentence, with no technical detail.'
		]
	}
} as const;

/** Serialises the system to Markdown for the copy button. */
export function designSystemMarkdown(): string {
	const d = designSystem;
	const lines: string[] = [];

	lines.push('# Fajr Labs — Design System', '', d.summary, '');

	lines.push('## Principles', '');
	for (const p of d.principles) lines.push(`- **${p.title}** — ${p.detail}`);
	lines.push('');

	lines.push('## Colour', '', d.colour.note, '');
	lines.push('| Token | Light | Dark | Use |', '| --- | --- | --- | --- |');
	for (const t of d.colour.tokens)
		lines.push(`| \`${t.name}\` | \`${t.light}\` | \`${t.dark}\` | ${t.use} |`);
	lines.push('');

	lines.push('## Typography', '');
	for (const f of d.typography.families) lines.push(`- **${f.name}** — ${f.role}. ${f.detail}`);
	lines.push('', '| Role | Specification |', '| --- | --- |');
	for (const s of d.typography.scale) lines.push(`| ${s.role} | ${s.spec} |`);
	lines.push('');
	for (const r of d.typography.rules) lines.push(`- ${r}`);
	lines.push('');

	lines.push('## Layout', '');
	lines.push('| Token | Value | Use |', '| --- | --- | --- |');
	for (const t of d.layout.tokens) lines.push(`| \`${t.name}\` | \`${t.value}\` | ${t.use} |`);
	lines.push('');
	for (const r of d.layout.rules) lines.push(`- ${r}`);
	lines.push('');

	lines.push('## Motion', '');
	for (const r of d.motion.rules) lines.push(`- ${r}`);
	lines.push('');

	lines.push('## Components', '');
	for (const c of d.components) lines.push(`- **${c.name}** — ${c.detail}`);
	lines.push('');

	lines.push('## Iconography', '');
	for (const r of d.iconography.rules) lines.push(`- ${r}`);
	lines.push('');

	lines.push('## Voice', '');
	for (const r of d.voice.rules) lines.push(`- ${r}`);
	lines.push('');

	return lines.join('\n');
}
