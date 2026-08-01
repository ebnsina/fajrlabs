import { browser } from '$app/env';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'fajrlabs:theme';

function readInitialTheme(): Theme {
	// The inline script in app.html has already resolved this before first paint.
	if (!browser) return 'light';
	return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

class ThemeController {
	current = $state<Theme>(readInitialTheme());

	toggle() {
		this.set(this.current === 'dark' ? 'light' : 'dark');
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
