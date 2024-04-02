import { type ServerLoadEvent } from "@sveltejs/kit"
import { censorGame } from "$lib/schema";
import { GameProgress } from "./common";

export const load = async (event: ServerLoadEvent) => {
    const userId = event.locals.pb.authStore.model?.id ?? "";
    const stats = (await event.locals.pb
        .collection('bs_stats')
        .getFullList({ fetch: event.fetch, filter: `user = "${userId}"`}))[0];
    const currentSet = (await event.locals.pb
        .collection('bs_current_set')
        .getFullList({ fetch: event.fetch, expand: 'games' }))[0];
    const progs = await event.locals.pb
        .collection('bs_game_progress')
        .getFullList({ fetch: event.fetch, filter: `user = "${userId}" && bs_game_set = "${currentSet.id}"`})
    const standing = (await event.locals.pb
        .collection('bs_this_week_scores')
        .getFullList({ fetch, filter: `user = "${userId}"` })).at(0);

    const wonGames = stats.won_games ?? 0;
    const totalGames = stats.total_games ?? 0;
    const winPct = Math.round((wonGames / Math.max(totalGames, 1)) * 100);
    const currentScore = progs.reduce((prev: number, p) => prev + p.score, 0);
    const weekScore = standing?.total_score ?? 0;

    let setProgress: Array<GameProgress> = [];
    let i = 0;
    for (let id of currentSet.games) {
        let prog = progs.find((p) => p.bs_game === id);
        if (prog === undefined) {
            censorGame(currentSet.expand!.games[i]);
            setProgress.push(GameProgress.NO_PROGRESS);
        } else if (!prog.won && !prog.lost) {
            censorGame(currentSet.expand!.games[i]);
            setProgress.push(GameProgress.SOME_PROGRESS);
        } else if (prog.lost) {
            setProgress.push(GameProgress.LOST);
        } else {
            setProgress.push(GameProgress.WON);
        }
        i += 1;
    }

    return {
        totalGames,
        winPct,
        currentSet,
        currentScore,
        weekScore,
        setProgress,
        streak: stats.current_streak ?? 0,
        maxStreak: stats.max_streak ?? 0,
    }
}