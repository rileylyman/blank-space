import type { BsWeeklyStanding } from "$lib/schema";

export interface Rankings {
    standings: Array<BsWeeklyStanding>;
    standingsPf: Array<BsWeeklyStanding>;
    standingsHc: Array<BsWeeklyStanding>;

    idx: number;
    idxPf: number;
    idxHc: number;

    score: number;
}