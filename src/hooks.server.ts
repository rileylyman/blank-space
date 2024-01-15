import { redirect } from "@sveltejs/kit";

export const handle = async ({event, resolve}) => {
    if (!event.url.pathname.startsWith('/auth')) {
        // return redirect(302, `/auth?return=${event.url.pathname}`);
    }
    const response = await resolve(event);
    return response;
}