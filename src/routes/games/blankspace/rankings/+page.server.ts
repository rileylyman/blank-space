import { type ServerLoadEvent } from "@sveltejs/kit"
import type { BsWeeklyStanding } from "$lib/schema";
import type TypedPocketBase from "$lib/schema";

const excludedUsers = ["x8mabziw1g7xgli", "g46kjxyg22of584", "t0tdwyeg9w84gmx"];

const augmentStandings = (standings: Array<BsWeeklyStanding>) => {
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

        standing.flags = standing.agg_flags.toString()
            .split(",")
            .map((f) => parseInt(f, 10))
            .reduce((acc, f) => acc | f, 0);
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
    augmentStandings(standings);

    let idx = standings.findIndex((standing) => standing.user === userId);
    let score = idx < 0 ? 0 : standings[idx]?.total_score ?? 0;
    return { standings, idx, score };
}

export const load = async (event: ServerLoadEvent) => {
    const userId = event.locals.pb.authStore.model?.id ?? "";

    let lastWeek = await getStandings("last", userId, event.locals.pb, event.fetch);
    let thisWeek = await getStandings("this", userId, event.locals.pb, event.fetch);

    return {
        lastWeek,
        thisWeek,
    };
}