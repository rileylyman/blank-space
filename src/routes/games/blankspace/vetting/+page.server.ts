import type { BsVettingProgress } from "$lib/schema";
import { error, type ServerLoadEvent } from "@sveltejs/kit"

export const load = async (event: ServerLoadEvent) => {
    const userId = event.locals.pb.authStore.model?.id ?? "";

    const progs = await event.locals.pb
        .collection('bs_vetting_progress')
        .getFullList({ filter: `user = "${userId}"`, fetch: event.fetch })

    let prog: BsVettingProgress;
    if (progs.at(0) === undefined) {
        prog = { id: '', user: userId, page: 1, pageLen: 10, cursor: 0 };
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

    const games = (await event.locals.pb
        .collection('bs_games')
        .getList(prog.page, prog.pageLen))
        .items;

    return {
        cursor: prog.cursor,
        games,
    };
}