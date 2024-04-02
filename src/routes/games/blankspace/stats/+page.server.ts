import { type ServerLoadEvent } from "@sveltejs/kit"
import { type Ranking } from './common';
import type { BsWeeklyStanding } from "$lib/schema";
import type TypedPocketBase from "$lib/schema";

const excludedUsers = ["x8mabziw1g7xgli", "g46kjxyg22of584"];

const addRanksToStandings = (standings: Array<BsWeeklyStanding>) => {
    let lastKnownScore = -1;
    let lastKnownRank = 0;
    let currentIndex = 0;
    for (let standing of standings) {
        if (standing.total_score != lastKnownScore) {
            lastKnownScore = standing.total_score;
            lastKnownRank = currentIndex + 1;
        }
        standing.rank = lastKnownRank;
        currentIndex += 1;
    }
}

const getStandings = async (
    week: "this" | "last",
    userId: string,
    pb: TypedPocketBase, 
    _fetch: typeof fetch, 
): Promise<{ standings: Array<BsWeeklyStanding>, idx: number, score: number }>  => {
    let standings = await pb
        .collection(`bs_${week}_week_scores`)
        .getFullList({ fetch: _fetch }) as BsWeeklyStanding[];
    standings = standings.filter((standing) => {
        // If we are an excluded user, then we keep the whole list. Otherwise, get rid of excluded users.
        return excludedUsers.includes(userId) ? true : !excludedUsers.includes(standing.user);
    })
    standings.sort((a, b) => b.total_score - a.total_score);
    addRanksToStandings(standings);

    let idx = standings.findIndex((standing) => standing.user === userId);
    let score = idx < 0 ? 0 : standings[idx]?.total_score ?? 0;
    return { standings, idx, score };
}

export const load = async (event: ServerLoadEvent) => {
    const userId = event.locals.pb.authStore.model?.id ?? "";

    let lastWeek = await getStandings("last", userId, event.locals.pb, event.fetch);
    let thisWeek = await getStandings("this", userId, event.locals.pb, event.fetch);

    const stats = (await event.locals.pb
        .collection('bs_stats')
        .getFullList({ fetch: event.fetch, filter: `user = "${userId}"`}))[0];
    const bars = new Map<string, number>();
    bars.set("1st", stats.gd1 ?? 0)
    bars.set("2nd", stats.gd2 ?? 0)
    bars.set("3rd", stats.gd3 ?? 0)
    bars.set("4th", stats.gd4 ?? 0)
    bars.set("5th", stats.gd5 ?? 0)

    return {
        bars,
        lastWeek,
        thisWeek,
    };
}