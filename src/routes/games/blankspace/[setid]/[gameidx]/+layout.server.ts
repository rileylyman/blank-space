import { type ServerLoadEvent, error } from '@sveltejs/kit';
import { BsResponseParser } from '$lib/blankspace-game-api';
import { BS_HOME_SKIP, blankspaceApi } from '$lib/links';
import { bsGameAllLowercase } from '$lib/schema';

export const load = async (event: ServerLoadEvent) => {
    const setId = event.params.setid ?? "";
    const gameIdx = parseInt(event.params.gameidx ?? '0');
    const userId = event.locals.pb.authStore.model?.id ?? "";
    const from = event.url.searchParams.get("from") ?? BS_HOME_SKIP;

    const set = await event.locals.pb
        .collection('bs_game_sets')
        .getOne(setId, { expand: 'games' });
    const gameId = set.games[gameIdx];
    const bsGame = set.expand!.games![gameIdx];
    bsGameAllLowercase(bsGame);
    // censorGame(bsGame);

    const feedbackList = await event.locals.pb
        .collection('bs_game_feedback')
        .getList(1, 1, { 
            filter: `user.id = '${userId}' && bs_game.id = '${gameId}' && prog.bs_game_set = '${setId}'`,
            fetch,
        });

    const res = await event.fetch(blankspaceApi(setId, gameId), {
        method: "POST"
    });
    const resJson = await res.json();
    const parseRes = BsResponseParser.safeParse(resJson);
    if (!parseRes.success || parseRes.data.error) {
        error(404);
    }

    return {
        bsResponse: parseRes.data,
        setId,
        gameIdx,
        gameId,
        bsGame,
        feedback: feedbackList.items.at(0) ?? null,
        from,
    }
}
