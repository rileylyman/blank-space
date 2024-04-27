import { type RequestEvent, json } from "@sveltejs/kit";

export const POST = async (event: RequestEvent) => {
    let progId = event.url.searchParams.get("progId");
    if (!progId) {
        return json({ success: false });
    }
    try {
        await event.locals.pb
            .collection('bs_game_progress')
            .delete(progId);
        return json({ success: true });
    } catch (e) {
        console.error(e);
        return json({ success: false });
    }
}