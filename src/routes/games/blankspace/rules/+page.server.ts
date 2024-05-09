import { type ServerLoadEvent } from "@sveltejs/kit"

export const load = async (event: ServerLoadEvent) => {
    const allRules = await event.locals.pb
        .collection('rules')
        .getFullList();
    const { text } = allRules.toSorted((a, b) => a.written_on > b.written_on ? -1 : 1)[0];

    return {
        text,
    }
}