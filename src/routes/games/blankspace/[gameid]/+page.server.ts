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
            filter: `user.id = '${userId}' && bs_game.id = '${gameId}'` 
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
        hasFeedback: feedbackList.items.length !== 0,
    }
}

export const actions = {
    feedback: async (event: RequestEvent) => {
        let form = await event.request.formData()

        let thumbs = form.get('thumbs')?.toString() === "true";
        let tags = form.get('tags')?.toString() ?? ""
        let feedback = form.get('feedback')?.toString() ?? "";

        let bsFeedback: BsGameFeedback = {
            id: "",
            bs_game: event.params.gameid ?? "",
            user: event.locals.pb.authStore.model?.id ?? "",
            thumbs,
            tags,
            feedback,
        }

        try {
            event.locals.pb.collection('bs_game_feedback').create(bsFeedback);
        } catch (_) {}

        return redirect(302, BS_GAME_LIST);
    }
}