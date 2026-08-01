/**
 * Decides how much motion this visitor should get, before any of it loads.
 * A weak device or a metered connection gets less, never a broken page.
 */
export type MotionLevel = 'full' | 'reduced' | 'none';

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

export function detectMotionLevel(): MotionLevel {
	if (typeof window === 'undefined') return 'none';

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'none';

	const nav = navigator as Navigator & {
		connection?: NetworkInformation;
		deviceMemory?: number;
	};

	// Data saver on, or a genuinely slow connection: skip the extra download.
	if (nav.connection?.saveData) return 'none';
	if (nav.connection?.effectiveType && /(^|-)2g$/.test(nav.connection.effectiveType)) return 'none';

	const cores = nav.hardwareConcurrency ?? 8;
	const memory = nav.deviceMemory ?? 8;
	if (cores <= 4 || memory <= 4) return 'reduced';

	if (nav.connection?.effectiveType === '3g') return 'reduced';

	return 'full';
}

/** Multiplies durations and staggers, so weak devices do less work per frame. */
export function motionScale(level: MotionLevel): number {
	if (level === 'none') return 0;
	return level === 'reduced' ? 0.6 : 1;
}
