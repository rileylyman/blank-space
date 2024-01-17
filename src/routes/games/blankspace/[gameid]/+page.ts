import PocketBase from 'pocketbase';
const pb = new PocketBase('https://pb.beeblegame.com');

export const load = async ({ params, fetch }) => {
    let game = undefined;
    try {
        game = await pb.collection('blankspace').getFirstListItem(`id = "${params.gameid}"`, {fetch});
    } catch (err) {
    }

    return {
        found: game !== undefined,
        game: game,
    };
}