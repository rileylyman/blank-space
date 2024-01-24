import { type ServerLoadEvent, error } from '@sveltejs/kit';
import { bsGameAllLowercase } from '$lib/schema';
import { BsResponseParser } from '$lib/blankspace-game-api';
import { blankspaceApi } from '$lib/links';

export const load = async (event: ServerLoadEvent) => {
    const res = await event.fetch(blankspaceApi(event.params.gameid ?? ""), {
        method: "POST"
    });
    const resJson = await res.json();
    const parseRes = BsResponseParser.safeParse(resJson);
    if (!parseRes.success || parseRes.data.error) {
        error(404);
    }

    return {
        bsResponse: parseRes.data,
        gameId: event.params.gameid!,
    }
}