import { type RequestEvent, json } from '@sveltejs/kit';
import fs from 'fs';

const wordList = fs.readFileSync("./src/routes/api/blankspace/words.txt", { encoding: 'utf16le' }).split('\n').map((s) => s.trim());
const numChunks = 100;
const chunkSize = Math.floor(wordList.length / numChunks);
const chunks: string[][] = [];
for (let i = 0; i < numChunks; i++) {
    let start = i * chunkSize;
    let end = i === (numChunks - 1) ? undefined : (i + 1) * chunkSize;
    chunks.push(wordList.slice(start, end));
}

export const GET = (event: RequestEvent) => {
    let chunk = parseInt(event.url.searchParams.get("chunk") ?? "");
    if (isNaN(chunk) || chunk < 0 || chunk >= numChunks) {
        return json({ numChunks });
    }
    return json({
        wordList: chunks[chunk],
        chunk,
    })
}