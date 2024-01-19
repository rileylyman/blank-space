import { type ServerLoadEvent, error } from '@sveltejs/kit';

export const load = async (event: ServerLoadEvent) => {
    try {
        const game = await event.locals.pb
            .collection('bs_games')
            .getOne(event.params.gameid ?? "", { fetch });
        return { game };
    } catch (_) {
        error(404);
    }
}