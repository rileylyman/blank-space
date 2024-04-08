import type TypedPocketBase, { type PbUser } from '$lib/schema';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: TypedPocketBase;
			wantsLogout: boolean | undefined;
		}
		interface PageData {
			pbUser: PbUser?;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '@fortawesome/pro-solid-svg-icons/index.es' {
  export * from '@fortawesome/pro-solid-svg-icons';
}

export {};
