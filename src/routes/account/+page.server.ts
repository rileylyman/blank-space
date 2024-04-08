import { redirect, type RequestEvent } from '@sveltejs/kit';

export const actions = {
    logout: async (event: RequestEvent) => {
        event.locals.pb.authStore.clear();
        event.locals.wantsLogout = true;
    }
}