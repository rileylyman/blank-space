import { type RequestEvent, json } from '@sveltejs/kit';
import fs from 'fs';

const wordList = fs.readFileSync("./src/routes/api/blankspace/words.txt", { encoding: 'utf16le' }).split('\n').map((s) => s.trim());

export const GET = (event: RequestEvent) => {
    return json({
        wordList,
    })
}