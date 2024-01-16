import { type RequestEvent } from '@sveltejs/kit';

export const load = async (event: RequestEvent) => {
    console.log("calling root layout loader", event.url.pathname);
    if (event.locals.pb.authStore.isValid) {
        const model = event.locals.pb.authStore.model!;
        return {
            user: {
                email: model.email,
                username: model.username,
                verified: model.verified,
                loggedIn: true,
            }
        }
    } else {
        return {
            user: {
                loggedIn: false,
            }
        }
    }
}