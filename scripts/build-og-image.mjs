// Regenerates static/og.png, the image shown when a page is shared.
// Run with: node scripts/build-og-image.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

// Static instances — the rasteriser cannot select a weight from a variable font.
const BOLD = 'node_modules/@fontsource/mona-sans/files/mona-sans-latin-700-normal.woff2';
const MONO = 'node_modules/@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff2';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
	<rect width="1200" height="630" fill="#ffffff"/>
	<rect x="0" y="0" width="1200" height="8" fill="#0b0b0d"/>
	<text x="80" y="120" font-family="Mona Sans" font-size="26" font-weight="bold"
		letter-spacing="3" fill="#0b0b0d">Fajr Labs</text>
	<text x="80" y="300" font-family="Mona Sans" font-size="88" font-weight="bold"
		letter-spacing="-3" fill="#0b0b0d">Software built to a standard,</text>
	<text x="80" y="392" font-family="Mona Sans" font-size="88" font-weight="bold"
		letter-spacing="-3" fill="#8a8a93">not to a brief.</text>
	<line x1="80" y1="490" x2="1120" y2="490" stroke="#ededf0" stroke-width="2"/>
	<text x="80" y="540" font-family="Geist Mono" font-size="22"
		letter-spacing="2" fill="#63636d">CUSTOM SOFTWARE · MOBILE APPS · PLUGINS · AI AUTOMATION</text>
	<text x="80" y="580" font-family="Geist Mono" font-size="22"
		letter-spacing="2" fill="#63636d">HALAL BY DESIGN</text>
</svg>`;

const resvg = new Resvg(svg, {
	fitTo: { mode: 'width', value: 1200 },
	font: { fontBuffers: [readFileSync(BOLD), readFileSync(MONO)], loadSystemFonts: false }
});

writeFileSync('static/og.png', resvg.render().asPng());
console.log('wrote static/og.png');
