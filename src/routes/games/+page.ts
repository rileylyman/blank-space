import PocketBase from 'pocketbase';
const pb = new PocketBase('https://pb.beeblegame.com');

export const load = async ({ fetch }) => {
    let games = await pb.collection('blankspace').getFullList({fetch});

    return {
        games: games || []
    };
}