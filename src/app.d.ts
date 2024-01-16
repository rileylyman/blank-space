// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import PocketBase from 'pocketbase';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase;
		}
		interface PageData {
			user: {
				loggedIn: boolean;
				verified: boolean;
				username: string;
				email: string;
			}
		}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '@fortawesome/pro-solid-svg-icons/index.es' {
  export * from '@fortawesome/pro-solid-svg-icons';
}

export {};
