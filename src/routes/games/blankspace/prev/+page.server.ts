import type { BsGameProgress, BsGameSet } from "$lib/schema";
import { type ServerLoadEvent } from "@sveltejs/kit"
import { type DayProgress } from "./common";
import { getFeatures } from "$lib/features";
import { getWeekProgresses } from "$lib/utils";

export const load = async (event: ServerLoadEvent) => {
    const [thisWeekSets, thisWeekProgs] = await getWeekProgresses(event.locals.pb, 'this');
    const [lastWeekSets, lastWeekProgs] = await getWeekProgresses(event.locals.pb, 'last');

    let lastDp: DayProgress[] = [];
    let thisDp: DayProgress[] = [];

    const appendDayProgress = (set: BsGameSet, progs: BsGameProgress[], arr: DayProgress[]) => {
        let played = progs
            .filter((p) => p.bs_game_set === set.id);
        arr.push({
            set,
            progs: played,
        })
    }

    lastWeekSets.forEach((set) => appendDayProgress(set, lastWeekProgs, lastDp));
    thisWeekSets.forEach((set) => appendDayProgress(set, thisWeekProgs, thisDp));

    return {
        lastDp,
        thisDp,
        features: await getFeatures(event.locals.pb),
    }
}