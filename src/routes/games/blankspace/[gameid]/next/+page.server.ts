import { type ServerLoadEvent, error } from '@sveltejs/kit';
import { bsGameAllLowercase } from '$lib/schema';

export const load = async (event: ServerLoadEvent) => {
    try {
        const game = await event.locals.pb
            .collection('bs_games')
            .getOne(event.params.gameid ?? "", { fetch });
        bsGameAllLowercase(game);
        return { game };
    } catch (_) {
        error(404);
    }
}