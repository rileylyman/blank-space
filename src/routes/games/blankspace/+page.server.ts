import { type ServerLoadEvent } from "@sveltejs/kit"

export const load = async (event: ServerLoadEvent) => {
    const userId = event.locals.pb.authStore.model?.id ?? "";
    const currentSet = (await event.locals.pb
        .collection('bs_current_set')
        .getFullList({ fetch: event.fetch, expand: 'games' }))[0];
    const progs = await event.locals.pb
        .collection('bs_game_progress')
        .getFullList({ fetch: event.fetch, filter: `user = "${userId}" && bs_game_set = "${currentSet.id}"`})
    const standing = (await event.locals.pb
        .collection('bs_this_week_scores')
        .getFullList({ fetch, filter: `user = "${userId}"` })).at(0);

    const currentScore = progs.reduce((prev: number, p) => prev + p.score, 0);
    const weekScore = standing?.total_score ?? 0;

    return {
        currentSet,
        currentScore,
        weekScore,
        progs,

        newAnnouncement: (async () => {
            const currAnn = (await event.locals.pb
                .collection('current_announcement')
                .getFullList())
                .at(0);
            if (!currAnn) return null;

            const read = (await event.locals.pb
                .collection('announcements_read')
                .getFullList({ filter: `user.id = "${userId}"`}))
                .at(0);
            if (!read || !read.read.includes(currAnn.id)) return currAnn;

            return null;
        })(),
    }
}