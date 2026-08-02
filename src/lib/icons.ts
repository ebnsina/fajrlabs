import {
	AiBrain01Icon,
	Alert02Icon,
	ArrowLeft02Icon,
	ArrowRight02Icon,
	ArrowUpRight01Icon,
	Cancel01Icon,
	CodeIcon,
	Menu01Icon,
	MinusSignIcon,
	Moon02Icon,
	PlusSignIcon,
	PuzzleIcon,
	SmartPhone01Icon,
	Sun03Icon,
	Tick02Icon
} from '@hugeicons/core-free-icons';

export { HugeiconsIcon } from '@hugeicons/svelte';

export {
	Alert02Icon,
	ArrowLeft02Icon,
	ArrowRight02Icon,
	ArrowUpRight01Icon,
	Cancel01Icon,
	Menu01Icon,
	MinusSignIcon,
	Moon02Icon,
	PlusSignIcon,
	Sun03Icon,
	Tick02Icon
};

/** Keeps the icon choice out of the content module. */
export const serviceIcons: Record<string, typeof CodeIcon> = {
	'custom-software': CodeIcon,
	'mobile-apps': SmartPhone01Icon,
	'custom-plugins': PuzzleIcon,
	'ai-automations': AiBrain01Icon
};
