/**
 * The design system, written once and used twice: rendered on /ds, and
 * serialised by the copy button so it can be handed to a model.
 *
 * The serialised form is a DESIGN.md — YAML front matter carrying the tokens a
 * machine needs, then prose explaining the reasoning behind them, in the eight
 * sections that specification defines. See https://github.com/google-labs-code/design.md
 *
 * Token values mirror `src/routes/layout.css` — change both together.
 */
export type Token = { name: string; light: string; dark: string; use: string };
export type Rule = { title: string; detail: string };

/** One typography level, in the shape DESIGN.md expects. */
export type TypeToken = {
	name: string;
	role: string;
	fontFamily: string;
	/** The largest step of the fluid range; `role` records the clamp in full. */
	fontSize: string;
	fontWeight: number;
	lineHeight: number;
	letterSpacing: string;
	/** Mona Sans is variable; the width axis does the work a display face would. */
	fontVariation?: string;
};

export type Dimension = { name: string; value: string; use: string };
export type ComponentToken = { name: string; detail: string; tokens: Record<string, string> };

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
		],
		/*
		 * The machine-readable levels. Sizes are the top of each fluid range,
		 * because a DESIGN.md dimension cannot hold a clamp(); the full range is
		 * in `scale` above, which is what anyone implementing should follow.
		 */
		tokens: [
			{
				name: 'headline-display',
				role: 'Home hero only',
				fontFamily: 'Mona Sans Variable',
				fontSize: '92px',
				fontWeight: 700,
				lineHeight: 0.97,
				letterSpacing: '-0.038em',
				fontVariation: "'wdth' 86"
			},
			{
				name: 'headline-lg',
				role: 'Page title',
				fontFamily: 'Mona Sans Variable',
				fontSize: '62px',
				fontWeight: 700,
				lineHeight: 1.02,
				letterSpacing: '-0.032em',
				fontVariation: "'wdth' 86"
			},
			{
				name: 'headline-md',
				role: 'Section heading',
				fontFamily: 'Mona Sans Variable',
				fontSize: '36px',
				fontWeight: 700,
				lineHeight: 1.1,
				letterSpacing: '-0.026em',
				fontVariation: "'wdth' 88"
			},
			{
				name: 'headline-sm',
				role: 'Card and row headings',
				fontFamily: 'Mona Sans Variable',
				fontSize: '23px',
				fontWeight: 700,
				lineHeight: 1.14,
				letterSpacing: '-0.022em',
				fontVariation: "'wdth' 92"
			},
			{
				name: 'body-lg',
				role: 'Standfirst and lead paragraphs',
				fontFamily: 'Mona Sans Variable',
				fontSize: '17px',
				fontWeight: 400,
				lineHeight: 1.6,
				letterSpacing: '0em'
			},
			{
				name: 'body-md',
				role: 'Running text',
				fontFamily: 'Mona Sans Variable',
				fontSize: '15px',
				fontWeight: 400,
				lineHeight: 1.6,
				letterSpacing: '0em'
			},
			{
				name: 'label-md',
				role: 'Rail labels, eyebrows, metadata',
				fontFamily: 'Geist Mono Variable',
				fontSize: '10.5px',
				fontWeight: 400,
				lineHeight: 1.4,
				letterSpacing: '0.16em'
			},
			{
				name: 'label-sm',
				role: 'Button and control labels',
				fontFamily: 'Geist Mono Variable',
				fontSize: '11px',
				fontWeight: 400,
				lineHeight: 1,
				letterSpacing: '0.12em'
			}
		] satisfies TypeToken[]
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
		],
		/*
		 * The spacing scale, in units a DESIGN.md accepts. The gutter is fluid
		 * between its two ends, and the measure is 62ch, which is a unit the
		 * format has no room for — both are described in the prose instead.
		 */
		spacing: [
			{ name: 'unit', value: '4px', use: 'Everything is a multiple of this' },
			{ name: 'gutter-min', value: '20px', use: 'Page padding on the narrowest screens' },
			{ name: 'gutter-max', value: '56px', use: 'Page padding once there is room' },
			{ name: 'rail', value: '152px', use: 'Label column above 900px' },
			{ name: 'container-max', value: '1240px', use: 'Centred page width' },
			{ name: 'section-y', value: '104px', use: 'Vertical rhythm between sections' }
		] satisfies Dimension[]
	},

	elevation: {
		note: 'There are no shadows anywhere. Depth is a change of surface, never a drop shadow, and a boundary is marked once — by space, by a hairline, or by a surface change, but never by two of them at the same edge.',
		levels: [
			{ title: 'Base', detail: 'The page itself, on --paper. Most of the site never leaves it.' },
			{
				title: 'Set apart',
				detail:
					'--surface marks a block as different in kind, not nearer the viewer: the closing call to action, a pull-out note. It carries no border, because the surface change is already the edge.'
			},
			{
				title: 'Above the page',
				detail:
					'Only the sticky header, which uses a translucent background with a 14px backdrop blur. The vendor-prefixed property must be written before the standard one or the minifier keeps only the last of the pair and the blur is silently dropped.'
			}
		] satisfies Rule[]
	},

	shapes: {
		note: 'Every corner on this site is square. There is no radius token because there is no radius: not on buttons, cards, inputs, images or the header. It is a deliberate part of the editorial feel, and rounding one thing would make everything else look unfinished.',
		rules: [
			'Border radius is 0 everywhere. The only curves are glyphs, icon strokes, and the theme reveal.',
			'A 1px hairline is the standard edge. --rule for dividers, --rule-strong where a border must hold its own.',
			'Icons in a bordered square box are controls. A bare glyph is a marker. Never mix the two for one purpose.'
		]
	},

	motion: {
		rules: [
			'GSAP is loaded with a dynamic import, so it is absent from the entry chunk and never blocks first paint.',
			'Three capability tiers: none (prefers-reduced-motion, data-saver, 2G), reduced (≤4 cores or ≤4GB, 3G), full.',
			'Animations are additive: content is visible in the HTML and animation only adds movement on top.',
			'Anything already on screen when it mounts is never animated. A `from` tween applies its start state after the browser has painted, so hiding something already visible is a flash.',
			'The page heading is the exception, because it cannot be skipped. Its start state is set synchronously in the attachment, before paint, with a 1.2s timeout that restores it if the engine never answers.',
			'Never animate with autoAlpha or visibility: hidden — it removes elements from the tab order and the accessibility tree.',
			'Pages cross-fade, and the theme is clipped open as a circle from the switch. Both use view transitions, scoped by a class each because they animate the same root snapshot.',
			'Every view-transition snapshot carries a background colour. Without one, a partly transparent snapshot shows the bare browser canvas, which is black under a dark colour-scheme.',
			'Durations 0.7–0.9s, ease power3.out. Hover transitions 160ms, page fade 190/260ms, theme wipe 480ms.'
		]
	},

	/** The machine-readable half of Components; the prose is in `components`. */
	componentTokens: [
		{
			name: 'button-solid',
			detail: 'The primary action. One per screen.',
			tokens: {
				backgroundColor: '{colors.inverse-paper}',
				textColor: '{colors.inverse-ink}',
				typography: '{typography.label-sm}',
				height: '46px',
				padding: '22px',
				rounded: '0px'
			}
		},
		{
			name: 'button-ghost',
			detail: 'Everything secondary.',
			tokens: {
				// Named rather than `transparent`, so a contrast check has something
				// real to measure — these controls always sit on the page itself.
				backgroundColor: '{colors.paper}',
				textColor: '{colors.ink}',
				borderColor: '{colors.rule-strong}',
				typography: '{typography.label-sm}',
				height: '46px',
				padding: '22px',
				rounded: '0px'
			}
		},
		{
			name: 'rail-label',
			detail: 'The section label in the left column.',
			tokens: { textColor: '{colors.faint}', typography: '{typography.label-md}' }
		},
		{
			name: 'service-row',
			detail: 'A full-width link row.',
			tokens: {
				backgroundColor: '{colors.paper}',
				textColor: '{colors.ink}',
				borderColor: '{colors.rule}',
				typography: '{typography.headline-sm}',
				padding: '{spacing.unit}'
			}
		},
		{
			name: 'cta-band',
			detail: 'The closing call to action.',
			tokens: {
				backgroundColor: '{colors.surface}',
				textColor: '{colors.ink}',
				typography: '{typography.headline-md}',
				rounded: '0px'
			}
		},
		{
			name: 'disclosure-marker',
			detail: 'The plus and minus on a question.',
			tokens: {
				borderColor: '{colors.rule}',
				textColor: '{colors.muted}',
				size: '26px',
				rounded: '0px'
			}
		}
	] satisfies ComponentToken[],

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

	/*
	 * The guardrails. Every one of these was written after getting it wrong once,
	 * which is the only reason any of them are worth stating.
	 */
	practice: {
		dos: [
			'Do get hierarchy from weight, width and space. That is the entire toolkit.',
			'Do reach for whitespace before drawing a line.',
			'Do write the vendor-prefixed property before the standard one, or the minifier keeps only the last of the pair.',
			'Do keep every corner square, including on anything new.',
			'Do ship content visible and add motion on top of it.',
			'Do give every control a visible focus ring and at least a 24×24 target.',
			'Do use Geist Mono for numbers, labels and metadata, and Mona Sans for everything else.'
		],
		donts: [
			'Do not introduce a hue, for any reason, including state, error and emphasis. If a fix seems to need colour, it does not.',
			'Do not mark one edge twice. A border and a background change at the same boundary is one too many.',
			'Do not animate autoAlpha, or anything setting visibility: hidden — it drops elements out of the tab order and the accessibility tree.',
			'Do not use a `from` tween for anything already on screen; it applies its start state after paint, which is a visible flash.',
			'Do not add a corner radius to one component to make it friendlier.',
			'Do not number a list unless the order carries meaning.',
			'Do not let a value drift from src/routes/layout.css — that file and this document must agree.'
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

/** Strips the leading `--` so a CSS custom property becomes a token name. */
const tokenName = (cssVar: string) => cssVar.replace(/^--/, '');

/**
 * Serialises the system as a DESIGN.md: YAML front matter holding the tokens,
 * then the reasoning behind them.
 *
 * The eight sections the format defines come first, in its order. Motion,
 * Iconography and Voice follow — the format has no place for them, and says a
 * consumer must preserve a section it does not recognise rather than fail.
 */
export function designSystemMarkdown(): string {
	const d = designSystem;
	const out: string[] = [];

	// ── Front matter ────────────────────────────────────────────────────────
	out.push('---');
	out.push('name: Fajr Labs');
	out.push(`description: ${JSON.stringify(d.summary)}`);

	// `rounded` is absent on purpose, and saying so stops a linter guessing.
	out.push('omitted:');
	out.push('  - section: rounded');
	out.push(`    reason: ${JSON.stringify(d.shapes.note.split('.')[0] + '.')}`);

	out.push('colors:');
	// The format requires a primary; in a monochrome system that is the ink.
	out.push('  primary: "{colors.ink}"');
	for (const t of d.colour.tokens) {
		out.push(`  ${tokenName(t.name)}: "${t.light}"`);
		out.push(`  ${tokenName(t.name)}-dark: "${t.dark}"`);
	}

	out.push('typography:');
	for (const t of d.typography.tokens) {
		out.push(`  ${t.name}:`);
		out.push(`    fontFamily: ${t.fontFamily}`);
		out.push(`    fontSize: ${t.fontSize}`);
		out.push(`    fontWeight: ${t.fontWeight}`);
		out.push(`    lineHeight: ${t.lineHeight}`);
		out.push(`    letterSpacing: ${t.letterSpacing}`);
		if (t.fontVariation) out.push(`    fontVariation: "${t.fontVariation}"`);
	}

	out.push('spacing:');
	for (const s of d.layout.spacing) out.push(`  ${s.name}: ${s.value}`);

	out.push('components:');
	for (const c of d.componentTokens) {
		out.push(`  ${c.name}:`);
		for (const [key, value] of Object.entries(c.tokens)) out.push(`    ${key}: "${value}"`);
	}
	out.push('---', '');

	// ── 1. Overview ─────────────────────────────────────────────────────────
	out.push('## Overview', '', d.summary, '');
	for (const p of d.principles) out.push(`- **${p.title}.** ${p.detail}`);
	out.push('');

	// ── 2. Colors ───────────────────────────────────────────────────────────
	out.push('## Colors', '', d.colour.note, '');
	out.push(
		'There is one palette and it is greyscale. `primary` is an alias for `ink`, because in a system with no hue the only "colour" is the text itself. Every token has a `-dark` counterpart, applied by redefining the same custom properties under `:root[data-theme="dark"]`.',
		''
	);
	out.push('| Token | Light | Dark | Use |', '| --- | --- | --- | --- |');
	for (const t of d.colour.tokens)
		out.push(`| \`${tokenName(t.name)}\` | \`${t.light}\` | \`${t.dark}\` | ${t.use} |`);
	out.push('');

	// ── 3. Typography ───────────────────────────────────────────────────────
	out.push('## Typography', '');
	for (const f of d.typography.families) out.push(`- **${f.name}** — ${f.role}. ${f.detail}`);
	out.push('');
	out.push(
		'Sizes in the front matter are the top of each range. On screen they are fluid, and these are the values to implement:',
		''
	);
	out.push('| Role | Specification |', '| --- | --- |');
	for (const s of d.typography.scale) out.push(`| ${s.role} | ${s.spec} |`);
	out.push('');
	for (const r of d.typography.rules) out.push(`- ${r}`);
	out.push('');

	// ── 4. Layout & Spacing ─────────────────────────────────────────────────
	out.push('## Layout & Spacing', '');
	out.push('| Token | Value | Use |', '| --- | --- | --- |');
	for (const t of d.layout.tokens) out.push(`| \`${t.name}\` | \`${t.value}\` | ${t.use} |`);
	out.push('');
	out.push(
		'The gutter is fluid between `gutter-min` and `gutter-max`, and the measure is `62ch` — neither survives the front matter, which takes only fixed px, em or rem. Implement the values in the table above.',
		''
	);
	for (const r of d.layout.rules) out.push(`- ${r}`);
	out.push('');

	// ── 5. Elevation & Depth ────────────────────────────────────────────────
	out.push('## Elevation & Depth', '', d.elevation.note, '');
	for (const l of d.elevation.levels) out.push(`- **${l.title}.** ${l.detail}`);
	out.push('');

	// ── 6. Shapes ───────────────────────────────────────────────────────────
	out.push('## Shapes', '', d.shapes.note, '');
	for (const r of d.shapes.rules) out.push(`- ${r}`);
	out.push('');

	// ── 7. Components ───────────────────────────────────────────────────────
	out.push('## Components', '');
	for (const c of d.components) out.push(`- **${c.name}** — ${c.detail}`);
	out.push('');

	// ── 8. Do's and Don'ts ──────────────────────────────────────────────────
	out.push("## Do's and Don'ts", '');
	for (const r of d.practice.dos) out.push(`- ${r}`);
	for (const r of d.practice.donts) out.push(`- ${r}`);
	out.push('');

	// ── Beyond the format ───────────────────────────────────────────────────
	out.push('## Motion', '');
	for (const r of d.motion.rules) out.push(`- ${r}`);
	out.push('');

	out.push('## Iconography', '');
	for (const r of d.iconography.rules) out.push(`- ${r}`);
	out.push('');

	out.push('## Voice', '');
	for (const r of d.voice.rules) out.push(`- ${r}`);
	out.push('');

	return out.join('\n');
}
