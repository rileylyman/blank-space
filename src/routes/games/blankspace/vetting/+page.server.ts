import type { BsVettingProgress } from "$lib/schema";
import { error, type ServerLoadEvent } from "@sveltejs/kit"

export const load = async (event: ServerLoadEvent) => {
    const userId = event.locals.pb.authStore.model?.id ?? "";

    const progs = await event.locals.pb
        .collection('bs_vetting_progress')
        .getFullList({ filter: `user = "${userId}"`, fetch: event.fetch })

    let prog: BsVettingProgress;
    if (progs.at(0) === undefined) {
        prog = { id: '', user: userId, cursor: 0 };
        try {
            await event.locals.pb
                .collection('bs_vetting_progress')
                .create(prog);
        } catch (err) {
            console.error(err);
            return error(404);
        }
    } else {
        prog = progs.at(0)!;
    }

    const PAGE_LEN = 10;
    const page = Math.floor(prog.cursor / PAGE_LEN) + 1;

    const gamesRes = await event.locals.pb
        .collection('bs_games')
        .getList(page, PAGE_LEN, { sort: 'created' });
    const games = gamesRes.items;

    // console.log(gamesRes);
    console.log("running");

    return {
        cursor: prog.cursor,
        pageLen: PAGE_LEN,
        games,
    };
}