import PocketBase from 'pocketbase';
const pb = new PocketBase('https://pb.beeblegame.com');


export const load = async ({ params, fetch }) => {
    const games = await pb.collection('blankspace').getFullList(100);

    const game = games.find((g) => g.id === params.gameid);

    return {
        found: game !== undefined,
        game: game,
    };
}