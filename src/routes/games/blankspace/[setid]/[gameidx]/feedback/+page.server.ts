import { type RequestEvent } from '@sveltejs/kit';
import type { BsGameFeedback } from '$lib/schema.js';
import { redirect } from '@sveltejs/kit';
import { BS_HOME_SKIP } from '$lib/links.js';

export const actions = {
    feedback: async (event: RequestEvent) => {
        const userId = event.locals.pb.authStore.model?.id ?? "";
        const setId = event.params.setid ?? "";
        const gameIdx = parseInt(event.params.gameidx ?? "0");

        let form = await event.request.formData()
        let thumbs = form.get('thumbs')?.toString() === "true";
        let tags = form.get('tags')?.toString() ?? ""
        let feedback = form.get('feedback')?.toString() ?? "";
        let returnTo = form.get('returnTo')?.toString() ?? BS_HOME_SKIP;

        let currentSet = await event.locals.pb
            .collection('bs_game_sets')
            .getOne(setId);
        let gameId = currentSet.games.at(gameIdx)!;

        let prog = await event.locals.pb
            .collection('bs_game_progress')
            .getFirstListItem(`user.id = "${userId}" && bs_game_set.id = "${setId}" && bs_game.id = "${gameId}"`);

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
            .getList(1, 1, {
                    filter: 
                        `user.id = "${userId}" && bs_game.id = "${gameId}" && prog.bs_game_set = "${setId}"`, 
                    fetch
                });

        if (oldFeedback.totalItems > 0) {
            event.locals.pb.collection('bs_game_feedback').update(oldFeedback.items[0].id, bsFeedback);
        } else {
            event.locals.pb.collection('bs_game_feedback').create(bsFeedback);
        }

        return redirect(302, returnTo);
    }
}