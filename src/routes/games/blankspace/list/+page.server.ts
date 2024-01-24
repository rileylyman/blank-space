import { censorGames, type BsGameProgress } from "$lib/schema";
import { type ServerLoadEvent } from "@sveltejs/kit";

export const load = async (event: ServerLoadEvent) => {
    const games = await event.locals.pb.collection('bs_games').getFullList({fetch});
    censorGames(games);

    const p = await event.parent();
    let progs: Array<BsGameProgress> = [];
    if (p.pbUser) {
        progs = await event.locals.pb.collection('bs_game_progress').getFullList({ filter: `user.id = '${p.pbUser.id}'`});
    }

    return { games, progs };
}