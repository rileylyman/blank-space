import { redirect } from "@sveltejs/kit";
import PocketBase from 'pocketbase';
import type TypedPocketBase from '$lib/schema';
import { AUTH_HOME } from "$lib/links";

export const handle = async ({event, resolve}) => {
    if (!event.url.pathname.startsWith('/api/tz') || !event.cookies.get('tz')) {
        return redirect(302, `/api/tz?from=${event.url.pathname}`);
    }

    const pb = new PocketBase('https://pb.slappygames.com') as TypedPocketBase;
    pb.authStore.loadFromCookie(event.request.headers.get('cookie') ?? '');

    try {
       pb.authStore.isValid && await pb.collection('users').authRefresh();
    } catch (_) {
        pb.authStore.clear();
    }
    event.locals.pb = pb;

    if (!pb.authStore.isValid && !event.url.pathname.startsWith(AUTH_HOME)) {
        event.cookies.set('wants_redirect', event.url.pathname, {
            httpOnly: true,
            secure: true,
            path: AUTH_HOME,
        });
        return redirect(302, AUTH_HOME);
    }

    const response = await resolve(event);

    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());
    if (process.env.NODE_ENV === 'development') {
      // response.headers.append(
      //     'cache-control', 'no-cache, no-store, must-revalidate');
      // response.headers.append('pragma', 'no-cache');
      // response.headers.append('expires', '0');
    }
    return response;
}