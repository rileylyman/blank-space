import type { BsGameSet } from "$lib/schema";
import { type ServerLoadEvent } from "@sveltejs/kit"
import { type DayProgress } from "./common";
import { GameProgress, progressToEnum } from "$lib/schema";

export const load = async (event: ServerLoadEvent) => {
    const userId = event.locals.pb.authStore.model?.id ?? "";
    const thisWeekSets = await event.locals.pb
        .collection('bs_this_week_sets')
        .getFullList();
    thisWeekSets.sort((a, b) => a.publish_on < b.publish_on ? -1 : 1);
    const lastWeekSets = await event.locals.pb
        .collection('bs_last_week_sets')
        .getFullList();
    lastWeekSets.sort((a, b) => a.publish_on < b.publish_on ? -1 : 1);

    let filter = `user.id = "${userId}"`;
    let separator = " && (";
    for (let set of lastWeekSets.concat(thisWeekSets)) {
        filter += `${separator}bs_game_set = "${set.id}"`
        separator = " || ";
    }
    filter += ')';

    const progs = await event.locals.pb
        .collection('bs_game_progress')
        .getFullList({ filter });

    let lastDp: DayProgress[] = [];
    let thisDp: DayProgress[] = [];

    const appendDayProgress = (set: BsGameSet, arr: DayProgress[]) => {
        let played = progs
            .filter((p) => p.bs_game_set === set.id && (p.won || p.lost));
        let gameProgs = new Array<GameProgress>();
        for (let gameId of set.games) {
            gameProgs.push(progressToEnum(played.find((p) => p.bs_game === gameId)));
        }
        arr.push({
            set,
            played: played.length,
            gameProgs,
        })
    }

    lastWeekSets.forEach((set) => appendDayProgress(set, lastDp));
    thisWeekSets.forEach((set) => appendDayProgress(set, thisDp));

    return {
        lastDp,
        thisDp,
    }
}