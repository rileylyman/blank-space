import { type ServerLoadEvent } from '@sveltejs/kit';

export const load = async (event: ServerLoadEvent) => {
    const pb = event.locals.pb;
    if (pb.authStore.isValid && pb.authStore.model && !pb.authStore.isAdmin) {
        const model = pb.authStore.model;
        return {
            pbUser: model,
        }
    } 
    return {
        pbUser: null,
    }
}