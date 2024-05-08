import { type ServerLoadEvent } from "@sveltejs/kit"
import type { BsWeeklyStanding } from "$lib/schema";
import type TypedPocketBase from "$lib/schema";
import { getFeatures } from "$lib/features";
import { areFlagsHardcore } from "$lib/utils";
import type { Rankings } from "./common";

const excludedUsers = ["x8mabziw1g7xgli", "g46kjxyg22of584", "t0tdwyeg9w84gmx"];

const augmentStandings = (standings: Array<BsWeeklyStanding>, key: 'rank' | 'rankHc' | 'rankPf', calcFlags: boolean) => {
    let lastKnownScore = -1;
    let lastKnownRank = 0;
    let currentIndex = 0;
    for (let standing of standings) {
        if (standing.total_score != lastKnownScore) {
            lastKnownScore = standing.total_score;
            lastKnownRank = currentIndex + 1;
        }
        standing[key] = lastKnownRank;
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
): Promise<Rankings>  => {
    let standings = await pb
        .collection(`bs_${week}_week_scores`)
        .getFullList({ fetch: _fetch }) as BsWeeklyStanding[];
    standings = standings.filter((standing) => {
        // If we are an excluded user, then we keep the whole list. Otherwise, get rid of excluded users.
        return excludedUsers.includes(userId) ? true : !excludedUsers.includes(standing.user);
    })
    standings.sort((a, b) => b.total_score - a.total_score);

    augmentStandings(standings, 'rank', true);

    // Order is important here, must come after first augment
    const standingsPf = standings.filter((s) => !areFlagsHardcore(s.flags!));
    const standingsHc = standings.filter((s) => areFlagsHardcore(s.flags!));

    augmentStandings(standingsHc, 'rankHc', false);
    augmentStandings(standingsPf, 'rankPf', false);

    const idx = standings.findIndex((s) => s.user === userId);
    const idxPf = standingsPf.findIndex((s) => s.user === userId);
    const idxHc = standingsHc.findIndex((s) => s.user === userId);

    const score = idx < 0 ? 0 : standings[idx]?.total_score ?? 0;

    return { standings, standingsPf, standingsHc, idx, idxPf, idxHc, score };
}

export const load = async (event: ServerLoadEvent) => {
    const userId = event.locals.pb.authStore.model?.id ?? "";

    let lastWeek = await getStandings("last", userId, event.locals.pb, event.fetch);
    let thisWeek = await getStandings("this", userId, event.locals.pb, event.fetch);

    return {
        lastWeek,
        thisWeek,
        features: await getFeatures(event.locals.pb),
    };
}