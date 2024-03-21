import { type ServerLoadEvent } from "@sveltejs/kit"
import { type Ranking } from './common';

export const load = async (event: ServerLoadEvent) => {
    const userId = event.locals.pb.authStore.model?.id ?? "";
    const stats = (await event.locals.pb
        .collection('bs_stats')
        .getFullList({ fetch: event.fetch, filter: `user = "${userId}"`}))[0];
    const standings = await event.locals.pb
        .collection('bs_weekly_standings')
        .getFullList({ fetch: event.fetch });
    standings.sort((a, b) => b.total_score - a.total_score);

    const bars = new Map<string, number>();
    bars.set("1st", stats.gd1 ?? 0)
    bars.set("2nd", stats.gd2 ?? 0)
    bars.set("3rd", stats.gd3 ?? 0)
    bars.set("4th", stats.gd4 ?? 0)
    bars.set("5th", stats.gd5 ?? 0)

    const rankings: Array<Ranking> = standings.map(({total_score, username}) => ({score: total_score, user: username}));

    const yourStandingIdx = standings.findIndex((standing) => standing.user === userId);
    const yourWeekScore = yourStandingIdx < 0 ? 0 : standings[yourStandingIdx]?.total_score ?? 0;

    return {
        bars,
        rankings,
        yourStandingIdx,
        yourWeekScore,
    }

}