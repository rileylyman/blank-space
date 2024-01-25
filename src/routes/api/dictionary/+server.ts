import { json, type RequestEvent } from "@sveltejs/kit"

import fs from 'fs';

let contents = fs.readFileSync("./src/routes/api/dictionary/words.txt").toString().split('\n');
console.log(contents[100]);

export const GET = async (event: RequestEvent) => {
    return json({ isWord: false });

    const fetch = event.fetch;
    const word = event.url.searchParams.get('word');
    if (!word) {
        return json({ isWord: false });
    }
    return json({ isWord: contents.includes(word.toLocaleLowerCase()) });
}