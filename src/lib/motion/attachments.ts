import type { Attachment } from 'svelte/attachments';
import { loadEngine, getMotionLevel } from './engine.js';

type RevealOptions = {
	/** Stagger before this element animates, in milliseconds. */
	delay?: number;
	/** Animates direct children in sequence instead of the element itself. */
	children?: boolean;
	y?: number;
};

/**
 * Lifts an element (or its children) into place as it enters the viewport.
 * Content ships visible; this only ever adds movement on top.
 */
export function reveal({
	delay = 0,
	children = false,
	y = 22
}: RevealOptions = {}): Attachment<HTMLElement> {
	return (node) => {
		if (getMotionLevel() === 'none') return;

		let cleanup: (() => void) | undefined;
		let cancelled = false;

		loadEngine().then((engine) => {
			if (!engine || cancelled) return;

			const targets = children ? Array.from(node.children) : node;
			const tween = engine.gsap.from(targets, {
				y,
				autoAlpha: 0,
				duration: 0.7 * engine.scale,
				ease: 'power3.out',
				delay: delay / 1000,
				stagger: children ? 0.05 * engine.scale : 0,
				scrollTrigger: { trigger: node, start: 'top 88%', once: true }
			});

			cleanup = () => {
				tween.scrollTrigger?.kill();
				tween.kill();
			};
		});

		return () => {
			cancelled = true;
			cleanup?.();
		};
	};
}

type SplitOptions = {
	unit?: 'chars' | 'words' | 'lines';
	stagger?: number;
	delay?: number;
	/** Runs straight away rather than waiting for the element to be scrolled to. */
	onLoad?: boolean;
};

/**
 * Masked line-by-line reveal. The element keeps its own markup, so nested
 * emphasis and its styling survive the split.
 */
export function splitReveal({
	unit = 'words',
	stagger = 0.04,
	delay = 0,
	onLoad = false
}: SplitOptions = {}): Attachment<HTMLElement> {
	return (node) => {
		if (getMotionLevel() === 'none') return;

		node.classList.add('split-pending');

		let cleanup: (() => void) | undefined;
		let cancelled = false;

		loadEngine().then((engine) => {
			if (cancelled) return;
			node.classList.remove('split-pending');
			if (!engine) return;

			const split = engine.SplitText.create(node, {
				type: `lines,${unit}`,
				mask: 'lines',
				autoSplit: true,
				onSplit(self) {
					return engine.gsap.from(self[unit], {
						yPercent: 110,
						duration: 0.8 * engine.scale,
						ease: 'power4.out',
						stagger: stagger * engine.scale,
						delay: delay / 1000,
						scrollTrigger: onLoad ? undefined : { trigger: node, start: 'top 88%', once: true }
					});
				}
			});

			cleanup = () => split.revert();
		});

		return () => {
			cancelled = true;
			node.classList.remove('split-pending');
			cleanup?.();
		};
	};
}

/** Lets an element lean toward the pointer. Ignored on touch and weak devices. */
export function magnetic(strength = 12): Attachment<HTMLElement> {
	return (node) => {
		if (getMotionLevel() !== 'full') return;
		if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

		let detach: (() => void) | undefined;
		let cancelled = false;

		loadEngine().then((engine) => {
			if (!engine || cancelled) return;

			const { gsap } = engine;
			const moveX = gsap.quickTo(node, 'x', { duration: 0.4, ease: 'power3' });
			const moveY = gsap.quickTo(node, 'y', { duration: 0.4, ease: 'power3' });

			function onMove(event: PointerEvent) {
				const box = node.getBoundingClientRect();
				moveX(
					gsap.utils.clamp(-strength, strength, (event.clientX - (box.left + box.width / 2)) * 0.35)
				);
				moveY(
					gsap.utils.clamp(-strength, strength, (event.clientY - (box.top + box.height / 2)) * 0.45)
				);
			}

			function reset() {
				moveX(0);
				moveY(0);
			}

			node.addEventListener('pointermove', onMove);
			node.addEventListener('pointerleave', reset);
			detach = () => {
				node.removeEventListener('pointermove', onMove);
				node.removeEventListener('pointerleave', reset);
				gsap.set(node, { x: 0, y: 0 });
			};
		});

		return () => {
			cancelled = true;
			detach?.();
		};
	};
}
