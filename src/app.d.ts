// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}

		/** Everything shown on an error page. `message` is always safe to display. */
		interface Error {
			message: string;
			reference?: string;
		}

		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
	}
}

export {};
