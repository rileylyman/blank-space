import { type ServerLoadEvent } from "@sveltejs/kit"

export const load = async (event: ServerLoadEvent) => {
    const userId = event.locals.pb.authStore.model?.id ?? "";
    const currentProgs = await event.locals.pb
        .collection('bs_current_set_progress')
        .getFullList({ fetch: event.fetch, filter: `user = "${userId}"`});
    const stats = (await event.locals.pb
        .collection('bs_stats')
        .getFullList({ fetch: event.fetch, filter: `user = "${userId}"`}))[0];
    const currentSet = (await event.locals.pb
        .collection('bs_current_set')
        .getFullList({ fetch: event.fetch }))[0];

    let scoreCounts = new Map<string, number>();
    scoreCounts.set("1st", stats.gd1 ?? 0);
    scoreCounts.set("2nd", stats.gd2 ?? 0);
    scoreCounts.set("3rd", stats.gd3 ?? 0);
    scoreCounts.set("4th", stats.gd4 ?? 0);
    scoreCounts.set("5th", stats.gd5 ?? 0);
    scoreCounts = new Map([...scoreCounts.entries()].sort());

    const wonGames = stats.won_games ?? 0;
    const totalGames = stats.total_games ?? 0;
    const winPct = Math.round((wonGames / Math.max(totalGames, 1)) * 100);

    console.log(currentProgs);

    let setProgress: Array<boolean | null> = [];
    for (let id of currentSet.games) {
        let prog = currentProgs.find((p) => p.bs_game === id);
        if (prog === undefined || !(prog.won || prog.lost)) {
            setProgress.push(null);
        } else if (prog.lost) {
            setProgress.push(false);
        } else {
            setProgress.push(true);
        }
    }

    return {
        totalGames,
        winPct,
        scoreCounts,
        currentSet,
        setProgress,
        streak: stats.current_streak ?? 0,
        maxStreak: stats.max_streak ?? 0,
    }
}