import { type RequestEvent } from '@sveltejs/kit';

export const load = async (event: RequestEvent) => {
    const email = event.url.searchParams.get('email');

    if (event.locals.pb.authStore.model?.verified) {
        return { email, verified: true, error: false };
    }

    const { token } = Object.fromEntries(event.url.searchParams);
    if (!token) {
        return { email, verified: false, error: false };
    }

    try {
        await event.locals.pb.collection('users').confirmVerification(token);
    } catch (err) {
        console.log(err);
        return { email, verified: false, error: true };
    }

    return { email, verified: true, error: false };
}