import { type ServerLoadEvent } from "@sveltejs/kit"

export const load = async (event: ServerLoadEvent) => {
    const userId = event.locals.pb.authStore.model?.id ?? "";

    const lastWeek = await event.locals.pb
        .collection('bs_last_week_scores')
        .getFullList({ filter: `user = "${userId}"`, fetch: event.fetch })
    const thisWeek = await event.locals.pb
        .collection('bs_this_week_scores')
        .getFullList({ filter: `user = "${userId}"`, fetch: event.fetch })
    
    const lastWeekScore = lastWeek.at(0)?.total_score ?? 0;
    const thisWeekScore = thisWeek.at(0)?.total_score ?? 0;

    const stats = (await event.locals.pb
        .collection('bs_stats')
        .getFullList({ fetch: event.fetch, filter: `user = "${userId}"`})).at(0);

    const bars = new Map<string, number>();
    bars.set("1st", stats?.gd1 ?? 0)
    bars.set("2nd", stats?.gd2 ?? 0)
    bars.set("3rd", stats?.gd3 ?? 0)
    bars.set("4th", stats?.gd4 ?? 0)
    bars.set("5th", stats?.gd5 ?? 0)

    return {
        bars,
        stats,
        lastWeekScore,
        thisWeekScore,
    };
}