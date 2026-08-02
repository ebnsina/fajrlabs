import type { Attachment } from 'svelte/attachments';
import { loadEngine, getMotionLevel } from './engine.js';

/** Where a scroll reveal begins, shared by the tween and the check below. */
const START = 'top 88%';
const START_RATIO = 0.88;

/**
 * True when the element is already past the point its reveal would fire.
 *
 * These must not animate. A `from` tween renders its start state the moment it
 * is built, which is after the browser has painted — so an element that is
 * already on screen goes visible, snaps to transparent, then fades back in.
 * That is the flash on navigation, and it is worst where the engine is already
 * cached, because the tween lands a single frame late instead of many.
 */
function alreadyOnScreen(node: HTMLElement): boolean {
	return node.getBoundingClientRect().top < window.innerHeight * START_RATIO;
}

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
		if (alreadyOnScreen(node)) return;

		let cleanup: (() => void) | undefined;
		let cancelled = false;

		loadEngine().then((engine) => {
			if (!engine || cancelled) return;

			const targets = children ? Array.from(node.children) : node;
			const tween = engine.gsap.from(targets, {
				y,
				// Opacity, never autoAlpha: visibility:hidden drops anything below the
				// fold out of the tab order and the accessibility tree until scrolled to.
				opacity: 0,
				duration: 0.7 * engine.scale,
				ease: 'power3.out',
				delay: delay / 1000,
				stagger: children ? 0.05 * engine.scale : 0,
				scrollTrigger: { trigger: node, start: START, once: true }
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
	delay?: number;
	/** Runs straight away rather than waiting for the element to be scrolled to. */
	onLoad?: boolean;
};

/**
 * Heading reveal.
 *
 * This used SplitText with masked lines. Two problems made that unshippable:
 * the masks clip descenders on tight display line-heights, and `autoSplit`
 * re-splitting on font load kills the in-flight tween and strands characters
 * part-way through their travel — leaving headings visibly cut in half.
 *
 * Until that is solved properly it lifts the whole heading instead, which is
 * quieter but always correct. The signature is unchanged so callers need not.
 */
export function splitReveal({
	delay = 0,
	onLoad = false
}: SplitOptions = {}): Attachment<HTMLElement> {
	return (node) => {
		if (getMotionLevel() === 'none') return;
		// A scroll reveal on something already in view would only flash it.
		if (!onLoad && alreadyOnScreen(node)) return;

		let cleanup: (() => void) | undefined;
		let cancelled = false;

		const restore = () => {
			node.style.removeProperty('opacity');
			node.style.removeProperty('transform');
			node.style.removeProperty('will-change');
		};

		// The heading is on screen from the start, so it cannot be skipped the way
		// the others are. Its start state is set here instead — synchronously,
		// inside the attachment, which runs before the browser paints. Leaving it
		// to the tween means one painted visible frame first, and that frame is
		// the flash. Anything set here must be guaranteed to come back off.
		let failsafe: ReturnType<typeof setTimeout> | undefined;

		if (onLoad) {
			node.style.opacity = '0';
			node.style.transform = 'translateY(26px)';
			node.style.willChange = 'opacity, transform';
			// If the engine never answers at all, show the heading anyway.
			failsafe = setTimeout(restore, 1200);
		}

		loadEngine().then((engine) => {
			clearTimeout(failsafe);
			// Motion off, chunk blocked, or the element already gone: a heading must
			// never be left sitting at zero opacity.
			if (!engine || cancelled) {
				restore();
				return;
			}

			const tween = engine.gsap.fromTo(
				node,
				{ y: 26, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.9 * engine.scale,
					ease: 'power3.out',
					delay: delay / 1000,
					clearProps: 'opacity,transform,willChange',
					scrollTrigger: onLoad ? undefined : { trigger: node, start: START, once: true }
				}
			);

			cleanup = () => {
				tween.scrollTrigger?.kill();
				tween.kill();
				restore();
			};
		});

		return () => {
			cancelled = true;
			clearTimeout(failsafe);
			cleanup?.();
			restore();
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
