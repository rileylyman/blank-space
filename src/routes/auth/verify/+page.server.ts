import { type RequestEvent } from '@sveltejs/kit';

export const load = async (event: RequestEvent) => {
    if (event.locals.pb.authStore.model?.verified) {
        return { verified: true, error: false };
    }

    const { token } = Object.fromEntries(event.url.searchParams);
    if (!token) {
        return { verified: false, error: false };
    }

    try {
        await event.locals.pb.collection('users').confirmVerification(token);
    } catch (err) {
        console.log(err);
        return { verified: false, error: true };
    }

    return { verified: true, error: false };
}