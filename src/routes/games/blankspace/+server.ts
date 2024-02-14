import { json, type RequestEvent } from '@sveltejs/kit';
import { ymdToString } from '$lib/utils';
import type { BsGameSet } from '$lib/schema';

export const POST = async (event: RequestEvent) => {
    const body = await event.request.json();
    if (!body.year || !body.month || !body.day) {
        return json({ haveTodaySet: false, gameResults: [] });
    }
    const publish_on = ymdToString(body.year, body.month, body.day);

    let currentSet: BsGameSet;
    let haveTodaySet: boolean;

    let currentSetRes = await event.locals.pb
        .collection('bs_game_sets')
        .getFullList({ filter: `publish_on ~ "${publish_on}"`, fetch });
    if (currentSetRes.length === 0) {
        let previousSets = await event.locals.pb
            .collection('bs_game_sets')
            .getFullList({ filter: `publish_on < "${publish_on}"`, fetch });
        previousSets.sort((a, b) => a.publish_on < b.publish_on ? -1 : 1).reverse();
        currentSet = previousSets[0];
        haveTodaySet = false;
    } else {
        currentSet = currentSetRes[0];
        haveTodaySet = true;
    }

    const userId = event.locals.pb.authStore.model?.id ?? "";
    let progs = await event.locals.pb.collection('bs_game_progress')
        .getFullList({ fetch: event.fetch, filter: `user.id = "${userId}"`})

    let setProgress: Array<boolean | null> = [];
    for (let id of currentSet.games) {
        let prog = progs.find((p) => p.bs_game === id);
        if (prog === undefined || !(prog.won || prog.lost)) {
            setProgress.push(null);
        } else if (prog.lost) {
            setProgress.push(false);
        } else {
            setProgress.push(true);
        }
    }

    return json({ haveTodaySet, currentSet, setProgress });
}