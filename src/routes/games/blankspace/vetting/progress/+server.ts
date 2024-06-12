import { type RequestEvent, json, error } from "@sveltejs/kit"

export const POST = async (event: RequestEvent) => {
    let cursorS = event.url.searchParams.get("cursor");
    let cursor = parseInt(cursorS ?? '');
    if (!cursorS || Number.isNaN(cursor)) {
        return error(404);
    }

    const userId = event.locals.pb.authStore.model?.id ?? "";
    const prog = (await event.locals.pb
        .collection('bs_vetting_progress')
        .getFullList({ filter: `user = "${userId}"`, fetch: event.fetch })).at(0);
    
    if (prog === undefined) {
        return  error(404);
    }

    await event.locals.pb
        .collection('bs_vetting_progress')
        .update(prog.id, { cursor });
    
    return json({ success: true });
}