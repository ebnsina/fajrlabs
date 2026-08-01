import type { Attachment } from 'svelte/attachments';

type RevealOptions = {
	/** Stagger, in milliseconds, applied before this element animates in. */
	delay?: number;
};

function prefersReducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Fades and lifts an element into place the first time it enters the viewport.
 * Elements are visible by default, so nothing is hidden if JavaScript never runs.
 */
export function reveal({ delay = 0 }: RevealOptions = {}): Attachment<HTMLElement> {
	return (node) => {
		if (prefersReducedMotion()) return;

		node.style.setProperty('--reveal-delay', `${delay}ms`);
		node.classList.add('reveal');

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					entry.target.classList.add('reveal-in');
					observer.unobserve(entry.target);
				}
			},
			{ rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
		);

		observer.observe(node);
		return () => observer.disconnect();
	};
}
