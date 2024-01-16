import { type RequestEvent, json } from '@sveltejs/kit';

export const POST = async (event: RequestEvent) => {
    const pb = event.locals.pb;
    if (pb.authStore.isValid) {
        try {
            await pb.collection('users').requestVerification(pb.authStore.model?.email)
            return json({ success: true });
        } catch (err) {
            console.log(err);
        }
    }

    return json({ success: false });
}