import { browser } from '$app/env';
import { getMotionLevel } from './motion.js';

export type Theme = 'light' | 'dark';

/** Where the new theme should start growing from, in viewport coordinates. */
export type Origin = { x: number; y: number };

const STORAGE_KEY = 'fajrlabs:theme';

function readInitialTheme(): Theme {
	// The inline script in app.html has already resolved this before first paint.
	if (!browser) return 'light';
	return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

class ThemeController {
	current = $state<Theme>(readInitialTheme());

	/**
	 * Switches the theme. Given the point that asked for it, the new appearance
	 * is revealed as a circle growing from there rather than replacing the page
	 * all at once — so the change reads as coming from the control you pressed.
	 */
	toggle(origin?: Origin) {
		const next: Theme = this.current === 'dark' ? 'light' : 'dark';
		const apply = () => this.set(next);

		if (!browser || !origin || !document.startViewTransition || getMotionLevel() === 'none') {
			apply();
			return;
		}

		const { x, y } = origin;
		const width = window.innerWidth;
		const height = window.innerHeight;

		/*
		 * Everything below is a percentage, never a pixel.
		 *
		 * The snapshot the clip is applied to is sized in device pixels, so on a
		 * 2× screen — every recent phone, and most laptops — a pixel coordinate
		 * lands at half its intended position and the circle opens from the middle
		 * of the page instead of the button. Percentages resolve against the same
		 * box whatever its scale, so they are right on every display.
		 */
		const cx = (x / width) * 100;
		const cy = (y / height) * 100;

		// Far enough to cover the whole viewport from wherever the button sits.
		const radius = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
		// How a percentage radius is resolved, per the CSS shapes spec.
		const reference = Math.hypot(width, height) / Math.SQRT2;
		const r = (radius / reference) * 100;

		// Marks this transition so the wipe styles apply here and not to a
		// navigation, which shares the same `root` snapshot.
		const root = document.documentElement;
		root.classList.add('theme-vt');

		const transition = document.startViewTransition(apply);

		transition.ready
			.then(() => {
				root.animate(
					{ clipPath: [`circle(0% at ${cx}% ${cy}%)`, `circle(${r}% at ${cx}% ${cy}%)`] },
					{
						duration: 480,
						easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
						pseudoElement: '::view-transition-new(root)'
					}
				);
			})
			// A refused transition must never leave the theme unswitched.
			.catch(() => apply());

		transition.finished.finally(() => root.classList.remove('theme-vt'));
	}

	set(next: Theme) {
		this.current = next;
		if (!browser) return;

		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// Private browsing can block storage; the theme still applies for this visit.
		}
	}
}

export const theme = new ThemeController();
