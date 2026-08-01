// Generates the raster icon set from the same mark as static/favicon.svg.
// Run with: node scripts/build-icons.mjs
import { writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const INK = '#0b0b0d';
const PAPER = '#ffffff';

/** The F mark, drawn at a 32-unit grid and scaled per output size. */
function markSvg({ size, background, foreground, padding }) {
	const inner = size - padding * 2;
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
	${background ? `<rect width="${size}" height="${size}" fill="${background}"/>` : ''}
	<g transform="translate(${padding} ${padding}) scale(${inner / 32})" fill="${foreground}">
		<rect x="7" y="5" width="4.5" height="22" />
		<rect x="7" y="5" width="18" height="4.5" />
		<rect x="7" y="14" width="12.5" height="4.5" />
	</g>
</svg>`;
}

function render(svg, size) {
	return new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
}

const outputs = [
	// Browser tab fallback for anything that will not take the SVG.
	{ file: 'static/favicon-96.png', size: 96, background: null, foreground: INK, padding: 0 },
	// Home-screen icons need their own background; transparency renders as black on iOS.
	{
		file: 'static/apple-touch-icon.png',
		size: 180,
		background: PAPER,
		foreground: INK,
		padding: 28
	},
	{ file: 'static/icon-192.png', size: 192, background: PAPER, foreground: INK, padding: 24 },
	{ file: 'static/icon-512.png', size: 512, background: PAPER, foreground: INK, padding: 64 },
	// Maskable icons are cropped to a circle, so the mark needs a wider margin.
	{
		file: 'static/icon-maskable-512.png',
		size: 512,
		background: PAPER,
		foreground: INK,
		padding: 102
	}
];

for (const { file, size, background, foreground, padding } of outputs) {
	writeFileSync(file, render(markSvg({ size, background, foreground, padding }), size));
	console.log('wrote', file);
}
