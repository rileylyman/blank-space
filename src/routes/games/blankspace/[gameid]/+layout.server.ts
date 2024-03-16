import { type ServerLoadEvent, error, type RequestEvent } from '@sveltejs/kit';
import { BsResponseParser } from '$lib/blankspace-game-api';
import { blankspaceApi } from '$lib/links';

export const load = async (event: ServerLoadEvent) => {
    const gameId = event.params.gameid ?? "";
    const userId = event.locals.pb.authStore.model?.id ?? "";

    const feedbackList = await event.locals.pb
        .collection('bs_game_feedback')
        .getList(1, 1, { 
            filter: `user.id = '${userId}' && bs_game.id = '${gameId}'`,
            fetch,
        });

    const res = await event.fetch(blankspaceApi(gameId), {
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
        feedback: feedbackList.items.at(0) ?? null,
    }
}
