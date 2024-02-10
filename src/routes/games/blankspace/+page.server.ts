import { type ServerLoadEvent } from "@sveltejs/kit"
import { GameStatus } from "./common";

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

    let tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    let tomorrow = tomorrowDate.toISOString().substring(0, 10);
    let previousSets = await event.locals.pb
        .collection('bs_game_sets')
        .getFullList({ filter: `publish_on < "${tomorrow}"`, fetch });

    previousSets.sort((a, b) => a.publish_on < b.publish_on ? -1 : 1).reverse();
    let todaySet = previousSets.at(0)!;

    let [nextYear, nextMonth, nextDay] = todaySet.publish_on.substring(0, 10).split("-")
    let nextDate = new Date(parseInt(nextYear), parseInt(nextMonth) - 1, parseInt(nextDay) + 1, 0, 0, 0, 0);

    let gameResults: Array<GameStatus> = [];
    for (let id of todaySet.games) {
        let prog = progs.find((p) => p.bs_game === id);
        if (prog === undefined) {
            gameResults.push(GameStatus.Unplayed);
        } else if (!prog.won && !prog.lost) {
            gameResults.push(GameStatus.InProgress);
        } else if (prog.lost) {
            gameResults.push(GameStatus.Lost);
        } else {
            gameResults.push(GameStatus.Won);
        }
    }

    return {
        totalGames,
        winPct,
        scoreCounts,
        todaySet,
        gameResults,
        nextDate,
    }
}