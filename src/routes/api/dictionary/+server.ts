import { json, type RequestEvent } from "@sveltejs/kit"

export const GET = async (event: RequestEvent) => {
    const fetch = event.fetch;
    const word = event.url.searchParams.get('word');
    if (!word) {
        return json({ isWord: false });
    }

    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    return json({ isWord: res.status === 200 });
}