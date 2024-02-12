import { type RequestEvent, json } from "@sveltejs/kit"

export const POST = async (event: RequestEvent) => {
    let j = await event.request.json();
    let tz = j.get('tz')?.toString();
    if (!tz || Number.isNaN(parseInt(tz))) {
        return json({ success: false });
    }
    event.cookies.set('tz', tz, { path: '/', maxAge: 24 * 60 * 60});
    return json({ success: true });
}