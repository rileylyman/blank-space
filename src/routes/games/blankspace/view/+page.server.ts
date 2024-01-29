import { bsGameAllLowercase, type BsGame, type BsGameFeedback, type BsGameProgress } from "$lib/schema";
import { type ServerLoadEvent } from "@sveltejs/kit";
import { error } from '@sveltejs/kit';

export const load = async (event: ServerLoadEvent) => {
    const userId = event.locals.pb.authStore.model?.id || error(404);
    const gamesPromise = event.locals.pb
        .collection('bs_games')
        .getFullList({ fetch });

    const progsPromise = event.locals.pb
        .collection('bs_game_progress')
        .getFullList({ filter: `user.id = '${userId}'`, fetch });
    const feedbacksPromise = event.locals.pb
        .collection ('bs_game_feedback')
        .getFullList({ fetch });

    const games = await gamesPromise;
    const progs = await progsPromise;
    const feedbacks = await feedbacksPromise;
    games.forEach(bsGameAllLowercase);

    interface Res {
        game: BsGame,
        prog: BsGameProgress,
        feedbacks: BsGameFeedback[],
    }
    const results = progs.reduce((res, prog) => {
        const game = games.find((g) => g.id === prog.bs_game);
        if (!game) return res; // This should never happen

        const fbs = feedbacks.filter((fb) => fb.bs_game === prog.bs_game);
        fbs.sort((a, b) => Date.parse(a.created!) - Date.parse(b.created!));
        res.push({ game, prog, feedbacks: fbs });
        return res;
    }, new Array<Res>());

    results.sort((a, b) => {
        const aLikes = a.feedbacks.filter((fb) => fb.thumbs).length;
        const bLikes = b.feedbacks.filter((fb) => fb.thumbs).length;
        const aDislikes = a.feedbacks.filter((fb) => !fb.thumbs).length;
        const bDislikes = b.feedbacks.filter((fb) => !fb.thumbs).length;
        if (aLikes === 0 && aDislikes === 0) {
            return 1;
        }
        if (bLikes === 0 && bDislikes === 0) {
            return -1;
        }
        return (bLikes - bDislikes) - (aLikes - aDislikes);
    });

    return {
        results,
    }
}