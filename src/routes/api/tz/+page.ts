import { type RequestEvent, redirect } from "@sveltejs/kit"

export const ssr = false;

export const load = async (event: RequestEvent) => {
    let from = event.url.searchParams.get('from');
    if (!from?.startsWith("/")) {
        from = "/";
    }
    await event.fetch(".", { method: "POST", body: JSON.stringify({ tz: (new Date()).getTimezoneOffset().toString() })});
    return redirect(302, from);
}