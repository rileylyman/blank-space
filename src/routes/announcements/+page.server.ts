import { type ServerLoadEvent } from "@sveltejs/kit"

export const load = async (event: ServerLoadEvent) => {
    let anns = await event.locals.pb
        .collection('announcements')
        .getFullList();
    anns = anns.filter((a) => new Date(a.release_on) < new Date(Date.now()));
    anns.sort((a, b) => (a.release_on < b.release_on) ? 1 : -1); // descending sort

    let read = (await event.locals.pb
        .collection('announcements_read')
        .getFullList({ filter: `user.id = "${event.locals.pb.authStore.model?.id}"` }))
        .at(0);

    return {
        anns,
        read,
    }
}