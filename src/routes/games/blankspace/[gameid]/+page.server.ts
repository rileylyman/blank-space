import { type ServerLoadEvent, error, type RequestEvent } from '@sveltejs/kit';
import { BsResponseParser } from '$lib/blankspace-game-api';
import { BS_GAME_LIST, blankspaceApi } from '$lib/links';
import type { BsGameFeedback } from '$lib/schema.js';
import { redirect } from '@sveltejs/kit';

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

export const actions = {
    feedback: async (event: RequestEvent) => {
        const userId = event.locals.pb.authStore.model?.id ?? "";
        const gameId = event.params.gameid ?? "";

        let form = await event.request.formData()
        let thumbs = form.get('thumbs')?.toString() === "true";
        let tags = form.get('tags')?.toString() ?? ""
        let feedback = form.get('feedback')?.toString() ?? "";

        let prog = await event.locals.pb
            .collection('bs_game_progress')
            .getFirstListItem(`user.id = "${userId}" && bs_game.id = "${gameId}"`);

        let bsFeedback: BsGameFeedback = {
            id: "",
            bs_game: gameId,
            user: userId,
            prog: prog.id,
            thumbs,
            tags,
            feedback,
        }

        let oldFeedback = await event.locals.pb.collection('bs_game_feedback')
            .getList(1, 1, {filter: `user.id = "${userId}" && bs_game.id = "${gameId}"`, fetch});

        if (oldFeedback.totalItems > 0) {
            event.locals.pb.collection('bs_game_feedback').update(oldFeedback.items[0].id, bsFeedback);
        } else {
            event.locals.pb.collection('bs_game_feedback').create(bsFeedback);
        }

        return { success: true };
    }
}