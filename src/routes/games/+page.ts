import PocketBase from 'pocketbase';
const pb = new PocketBase('https://pb.beeblegame.com');

export const load = async () => {
    let games = await pb.collection('blankspace').getFullList();

    return {
        games: games || []
    };
}