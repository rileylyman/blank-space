import { type ServerLoadEvent } from "@sveltejs/kit"

export const load = async (event: ServerLoadEvent) => {
    const pb = event.locals.pb;
    const parent = await event.parent();
    const total = (await pb
        .collection('bs_games')
        .getFullList())
        .length;
    const numPlayed = (await pb
        .collection('bs_game_progress')
        .getFullList({ filter: `user.id = '${parent.pbUser.id}'`}))
        .length;

    return {
        skip: event.url.searchParams.has('skip'),
        newGames: total - numPlayed,
    }
}