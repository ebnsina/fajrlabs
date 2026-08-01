<script lang="ts">
	import { onMount } from 'svelte';
	import { loadEngine, getMotionLevel } from '#lib/motion/engine.js';

	let dot = $state<HTMLDivElement>();
	let label = $state('');

	onMount(() => {
		// A touch user has no pointer to replace, and reduced motion means leave it alone.
		if (!dot || getMotionLevel() === 'none') return;
		if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

		let detach: (() => void) | undefined;
		let cancelled = false;

		loadEngine().then((engine) => {
			if (!engine || cancelled || !dot) return;

			const { gsap } = engine;
			// Short duration: a cursor that lags behind the pointer feels broken.
			const moveX = gsap.quickTo(dot, 'x', { duration: 0.16, ease: 'power2.out' });
			const moveY = gsap.quickTo(dot, 'y', { duration: 0.16, ease: 'power2.out' });

			gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 0.32, autoAlpha: 0 });

			let shown = false;

			function onMove(event: PointerEvent) {
				if (!shown) {
					shown = true;
					// Only now is there something to replace the native pointer with.
					document.documentElement.classList.add('has-custom-cursor');
					gsap.to(dot!, { autoAlpha: 1, duration: 0.2 });
				}
				moveX(event.clientX);
				moveY(event.clientY);

				const next = (event.target as Element | null)?.closest?.('[data-cursor]');
				const text = next?.getAttribute('data-cursor') ?? '';
				if (text !== label) {
					label = text;
					gsap.to(dot!, { scale: text ? 1 : 0.32, duration: 0.3, ease: 'power3.out' });
				}
			}

			const hide = () => {
				shown = false;
				document.documentElement.classList.remove('has-custom-cursor');
				gsap.to(dot!, { autoAlpha: 0, duration: 0.2 });
			};
			const press = () => gsap.to(dot!, { scale: label ? 0.88 : 0.22, duration: 0.16 });
			const release = () => gsap.to(dot!, { scale: label ? 1 : 0.32, duration: 0.22 });

			window.addEventListener('pointermove', onMove, { passive: true });
			document.addEventListener('pointerleave', hide);
			window.addEventListener('pointerdown', press);
			window.addEventListener('pointerup', release);

			detach = () => {
				document.documentElement.classList.remove('has-custom-cursor');
				window.removeEventListener('pointermove', onMove);
				document.removeEventListener('pointerleave', hide);
				window.removeEventListener('pointerdown', press);
				window.removeEventListener('pointerup', release);
			};
		});

		return () => {
			cancelled = true;
			detach?.();
		};
	});
</script>

<div class="cursor" bind:this={dot} aria-hidden="true">
	{#if label}<span>{label}</span>{/if}
</div>

<style>
	.cursor {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 90;
		display: grid;
		place-items: center;
		min-width: 78px;
		height: 78px;
		padding-inline: 16px;
		border-radius: 999px;
		background: #ffffff;
		color: #000000;
		/* Difference blending inverts whatever is underneath — ideal for monochrome. */
		mix-blend-mode: difference;
		pointer-events: none;
		visibility: hidden;
		will-change: transform;
	}

	.cursor span {
		font-family: var(--font-mono);
		font-size: 10.5px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		white-space: nowrap;
	}

	/* The real pointer only disappears once ours is actually running. */
	:global(html.has-custom-cursor),
	:global(html.has-custom-cursor *) {
		cursor: none !important;
	}

	@media (hover: none), (pointer: coarse) {
		.cursor {
			display: none;
		}
	}
</style>
