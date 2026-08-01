// Public entry point for motion. Pages import from here and never touch GSAP
// directly, so the whole treatment can be tuned or removed in one place.
export { reveal, splitReveal, magnetic } from './motion/attachments.js';
export { getMotionLevel } from './motion/engine.js';
export type { MotionLevel } from './motion/capability.js';
