import { detectMotionLevel, motionScale, type MotionLevel } from './capability.js';

type Engine = {
	gsap: typeof import('gsap').gsap;
	ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
	SplitText: typeof import('gsap/SplitText').SplitText;
	level: MotionLevel;
	scale: number;
};

let pending: Promise<Engine | null> | null = null;
let level: MotionLevel | null = null;

export function getMotionLevel(): MotionLevel {
	level ??= detectMotionLevel();
	return level;
}

/**
 * Loads GSAP on demand, once. Returns null when motion is switched off or the
 * download fails — callers then simply leave the content as the server sent it.
 */
export function loadEngine(): Promise<Engine | null> {
	if (pending) return pending;

	pending = (async () => {
		const current = getMotionLevel();
		if (current === 'none') return null;

		try {
			const [core, scrollTrigger, splitText] = await Promise.all([
				import('gsap'),
				import('gsap/ScrollTrigger'),
				import('gsap/SplitText')
			]);

			core.gsap.registerPlugin(scrollTrigger.ScrollTrigger, splitText.SplitText);

			// Recalculating on every mobile address-bar nudge is a common jank source.
			scrollTrigger.ScrollTrigger.config({ ignoreMobileResize: true });

			return {
				gsap: core.gsap,
				ScrollTrigger: scrollTrigger.ScrollTrigger,
				SplitText: splitText.SplitText,
				level: current,
				scale: motionScale(current)
			};
		} catch (error) {
			// A blocked or failed chunk must never take the page down with it.
			console.warn('Motion is unavailable; continuing without it.', error);
			return null;
		}
	})();

	return pending;
}
