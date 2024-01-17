import { type ServerLoadEvent } from "@sveltejs/kit";

export const load = async (event: ServerLoadEvent) => {
    const games = await event.locals.pb.collection('bs_games').getFullList({fetch});
    return { games };
}