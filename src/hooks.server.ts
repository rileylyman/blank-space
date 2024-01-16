import { redirect } from "@sveltejs/kit";
import PocketBase from 'pocketbase';

export const handle = async ({event, resolve}) => {
    const pb = new PocketBase('https://pb.slappygames.com');
    pb.authStore.loadFromCookie(event.request.headers.get('cookie') ?? '');

    try {
       pb.authStore.isValid && await pb.collection('users').authRefresh();
    } catch (_) {
        pb.authStore.clear();
    }
    event.locals.pb = pb;

    if (!pb.authStore.isValid && !event.url.pathname.startsWith('/auth')) {
        event.cookies.set('wants_redirect', event.url.pathname, {
            httpOnly: true,
            secure: true,
            path: '/auth',
        });
        return redirect(302, `/auth`);
    }

    const response = await resolve(event);

    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());
    return response;
}