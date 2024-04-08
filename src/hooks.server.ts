import { redirect } from "@sveltejs/kit";
import PocketBase from 'pocketbase';
import type TypedPocketBase from '$lib/schema';
import { AUTH_HOME } from "$lib/links";
import 'dotenv/config';

export const handle = async ({event, resolve}) => {
    const pb = new PocketBase(process.env.PB_ADDR) as TypedPocketBase;
    pb.authStore.loadFromCookie(event.request.headers.get('cookie') ?? '');

    try {
       pb.authStore.isValid && await pb.collection('users').authRefresh();
    } catch (err) {
        console.log(err);
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

    if (pb.authStore.isValid || event.locals.wantsLogout) {
        response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());
    }
    if (process.env.NODE_ENV === 'development') {
      // response.headers.append(
      //     'cache-control', 'no-cache, no-store, must-revalidate');
      // response.headers.append('pragma', 'no-cache');
      // response.headers.append('expires', '0');
    }
    return response;
}