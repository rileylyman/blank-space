import { type ServerLoadEvent } from "@sveltejs/kit"
import { censorGame, GameProgress, progressToEnum } from "$lib/schema";

export const load = async (event: ServerLoadEvent) => {
    const userId = event.locals.pb.authStore.model?.id ?? "";
    const currentSet = (await event.locals.pb
        .collection('bs_current_set')
        .getFullList({ fetch: event.fetch, expand: 'games' }))[0];
    const progs = await event.locals.pb
        .collection('bs_game_progress')
        .getFullList({ fetch: event.fetch, filter: `user = "${userId}" && bs_game_set = "${currentSet.id}"`})
    const standing = (await event.locals.pb
        .collection('bs_this_week_scores')
        .getFullList({ fetch, filter: `user = "${userId}"` })).at(0);

    const currentScore = progs.reduce((prev: number, p) => prev + p.score, 0);
    const weekScore = standing?.total_score ?? 0;

    let setProgress: Array<GameProgress> = [];
    let i = 0;
    for (let id of currentSet.games) {
        let prog = progs.find((p) => p.bs_game === id);
        setProgress.push(progressToEnum(prog));
        if ([GameProgress.NO_PROGRESS, GameProgress.SOME_PROGRESS].includes(setProgress[-1])) {
            censorGame(currentSet.expand!.games[i]);
        }
        i += 1;
    }

    return {
        currentSet,
        currentScore,
        weekScore,
        setProgress,
    }
}