import { type ServerLoadEvent } from '@sveltejs/kit';

export const load = async (event: ServerLoadEvent) => {
    const pb = event.locals.pb;
    const params = event.params;

    try {
        const game = await pb
            .collection('bs_games')
            .getFirstListItem(`id = "${params.gameid}"`, { fetch });
        return { game };
    } catch (err) {
        console.log("could not find game", params.gameid, err);
        return {};
    }
}