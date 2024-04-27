import { type RequestEvent, json } from "@sveltejs/kit";

export const POST = async (event: RequestEvent) => {
    const progId = event.url.searchParams.get("progId");
    if (!progId) {
        return json({ success: false });
    }
    const userId = event.locals.pb.authStore.model?.id;
    if (userId === undefined) {
        return json({ success: false });
    }

    const featureControl = (await event.locals.pb
        .collection('feature_control')
        .getFullList({ filter: 'name = "clearProgress"' }))
        .at(0);
    if (featureControl === undefined || !featureControl.filter.includes(userId)) {
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