import { bsGameAllLowercase, type BsGame, type BsGameFeedback, type BsGameProgress } from "$lib/schema";
import { type ServerLoadEvent } from "@sveltejs/kit";
import type { GameAllInfo } from "./common";

export const load = async (event: ServerLoadEvent) => {
    const feedbacks = await event.locals.pb
        .collection ('bs_game_feedback')
        .getFullList({ fetch, expand: 'user,bs_game,prog,prog.bs_game_set' });
    feedbacks.forEach((fb) => bsGameAllLowercase(fb.expand!.bs_game!));

    const userId = event.locals.pb.authStore.model?.id ?? "";
    let infos: GameAllInfo[] = [];

    feedbacks.forEach((fb) => {
        let res = infos.find((res) => res.game.id === fb.expand!.bs_game!.id);
        if (!res) {
            res = { setId: "", gameIdx: -1, game: fb.expand!.bs_game!, feedbacks: [], thumbsDown: 0, thumbsUp: 0};
            infos.push(res);
        }
        res.feedbacks.push(fb);
        if (fb.thumbs) {
            res.thumbsUp += 1;
        } else {
            res.thumbsDown += 1;
        }
        if (fb.user === userId && !res.prog)  {
            res.prog = fb.expand!.prog!;
        }
        if (!res.setId && fb.expand!.prog!.bs_game_set) {
            res.setId = fb.expand!.prog!.expand!.bs_game_set!.id;
            res.gameIdx = fb.expand!.prog!.expand!.bs_game_set!.games.findIndex((id) => id === res?.game.id);
        }
    });

    infos.sort((a, b) => {
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
        infos,
    }
}