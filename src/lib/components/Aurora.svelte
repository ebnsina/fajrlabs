<script lang="ts">
	/**
	 * A monochrome aurora, generated from a seed rather than shipped as a file.
	 * Every piece gets its own without anyone having to make one, and there is no
	 * image to load, no weight, and nothing to go stale.
	 *
	 * Greys only. The bloom carries the whole thing, exactly as elsewhere on the
	 * site: hierarchy from light and weight, never from hue.
	 */
	type Props = { seed: string; ratio?: string };

	let { seed, ratio = '16 / 10' }: Props = $props();

	// Small deterministic hash. Same seed always draws the same picture, so a
	// piece looks identical on the index, on its own page and in a preview.
	function hash(value: string): number {
		let h = 2166136261;
		for (let i = 0; i < value.length; i++) {
			h ^= value.charCodeAt(i);
			h = Math.imul(h, 16777619);
		}
		return h >>> 0;
	}

	// Each call takes a different slice of the hash, so the values vary together
	// without ever repeating the same number twice in one card.
	const pick = (h: number, shift: number, min: number, max: number) =>
		min + (((h >>> shift) & 0xff) / 255) * (max - min);

	const light = $derived.by(() => {
		const h = hash(seed);
		return {
			// The bloom sits mostly off the canvas, so only its edge reaches in and
			// the card reads as a corner sweep rather than a spotlight in the middle.
			// Always low and right, which keeps the top-left dark for the type.
			x: pick(h, 0, 84, 108),
			y: pick(h, 5, 82, 112),
			spread: pick(h, 11, 86, 124),
			// A second, dimmer bloom off the opposite edge stops the sweep reading
			// as a plain diagonal fade.
			hazeX: pick(h, 17, -14, 22),
			hazeY: pick(h, 23, -10, 30),
			angle: pick(h, 3, 108, 152)
		};
	});
</script>

<div
	class="aurora"
	style:aspect-ratio={ratio}
	style:--x="{light.x}%"
	style:--y="{light.y}%"
	style:--spread="{light.spread}%"
	style:--haze-x="{light.hazeX}%"
	style:--haze-y="{light.hazeY}%"
	style:--angle="{light.angle}deg"
	aria-hidden="true"
></div>

<style>
	.aurora {
		position: relative;
		width: 100%;
		overflow: hidden;
		background-color: #0a0a0a;
		background-image:
			radial-gradient(
				ellipse var(--spread) calc(var(--spread) * 0.78) at var(--x) var(--y),
				#ffffff 0%,
				#e7e7e7 16%,
				#ababab 32%,
				#606060 48%,
				#2e2e2e 66%,
				rgba(10, 10, 10, 0) 82%
			),
			radial-gradient(
				ellipse 70% 55% at var(--haze-x) var(--haze-y),
				#343434 0%,
				rgba(10, 10, 10, 0) 70%
			),
			linear-gradient(var(--angle), #0a0a0a 0%, #111111 40%, #1d1d1d 72%, #2d2d2d 100%);
	}

	/* Grain, desaturated in the filter itself — feTurbulence is colour noise, and
	   colour is the one thing this site does not do. */
	.aurora::after {
		content: '';
		position: absolute;
		inset: -50%;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23g)'/%3E%3C/svg%3E");
		opacity: 0.3;
		pointer-events: none;
	}

	/* Overlay keeps the grain visible on the dark ground without washing out the
	   bright end, which a plain opacity layer would turn milky. */
	@supports (mix-blend-mode: overlay) {
		.aurora::after {
			mix-blend-mode: overlay;
			opacity: 0.85;
		}
	}
</style>
