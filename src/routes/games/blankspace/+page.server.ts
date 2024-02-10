import { type ServerLoadEvent } from "@sveltejs/kit"

export const load = async (event: ServerLoadEvent) => {
    const userId = event.locals.pb.authStore.model?.id ?? "";
    let progs = await event.locals.pb
        .collection('bs_game_progress')
        .getFullList({ fetch, filter: `user.id = "${userId}"`});
    
    let totalGames = 0;
    let totalWon = 0;
    let scoreCounts = new Map<string, number>();
    const cardinalStrings = ["1st", "2nd", "3rd", "4th", "5th"];
    for (let s of cardinalStrings) scoreCounts.set(s, 0);
    for (let prog of progs) {
        if (!prog.won && !prog.lost) continue;
        totalGames += 1;
        if (prog.won) totalWon += 1;

        const numGuesses = cardinalStrings.at(prog.guesses.split(",").length - 1) ?? "error";
        scoreCounts.set(numGuesses, (scoreCounts.get(numGuesses) ?? 0) + 1);
    }
    let winPct = Math.round((totalWon / Math.max(totalGames, 1)) * 100);
    scoreCounts = new Map([...scoreCounts.entries()].sort());


    return {
        totalGames,
        winPct,
        scoreCounts,
    }
}