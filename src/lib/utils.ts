import { ProgressFlags, type BsGameProgress, type BsGameSet, type UserPreferences } from "./schema";
import type TypedPocketBase from "./schema";

export const areFlagsHardcore = (flags: number): boolean => {
    return (flags & (ProgressFlags.KeyboardUpdated | ProgressFlags.NumLettersShown)) === 0;
}

export const getWeekProgresses = async (pb: TypedPocketBase, week: 'this' | 'last'): Promise<[BsGameSet[], BsGameProgress[]]> => {
    const userId = pb.authStore.model?.id ?? "";
    const collection = `bs_${week}_week_sets`;
    const weekSets: BsGameSet[] = await pb
        .collection(collection)
        .getFullList({ expand: 'games' });
    weekSets.sort((a, b) => a.publish_on < b.publish_on ? -1 : 1);

    let filter = `user.id = "${userId}"`;
    let separator = " && (";
    for (let set of weekSets.concat(weekSets)) {
        filter += `${separator}bs_game_set = "${set.id}"`
        separator = " || ";
    }
    filter += ')';

    const progs = await pb
        .collection('bs_game_progress')
        .getFullList({ filter });
    
    return [weekSets, progs];
}

export const getUserPreferences = async (pb: TypedPocketBase): Promise<UserPreferences> => {
    const prefs = (await pb
        .collection('user_preferences')
        .getFullList({ filter: `user.id = "${pb.authStore.model?.id}"` }))
        .at(0);
    if (prefs === undefined) {
        await pb
            .collection('user_preferences')
            .create({ user: pb.authStore.model?.id, peacefulMode: false });
        return await getUserPreferences(pb);
    }
    return prefs;
}

export const setUserPreferences = async (pb: TypedPocketBase, newPrefs: UserPreferences) => {
    await pb
        .collection('user_preferences')
        .update(newPrefs.id, newPrefs)
}

export interface CookieOpts {
    maxAge?: number;
    path?: string;
}

export const setCookie = (name: string, value: string, opts: CookieOpts = {}) => {
    let c = `${name}=${value} ;samesite=strict ;secure`
    if (opts.maxAge !== undefined) c += ` ;max-age=${opts.maxAge}`;
    c += ` ;path=${opts.path ?? "/"}`;
    document.cookie = c;
}

export const getCookie = (name: string): string | undefined => 
    document.cookie.split(";").find((c) => c.includes(name))?.split("=").at(1);

export const getWantHomeMenu = () => !!getCookie("wantHomeMenu");

export const setWantHomeMenu = (want: boolean) => {
    setCookie("wantHomeMenu", "yes", { maxAge: want ? undefined : 0 });
} 

export const sleepMs = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fitText = (root: HTMLElement, query: string, scale: number) => {
    const nodes = root.querySelectorAll(query);
    nodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        const setFontSize = (s: number) => {
            node.style.fontSize = s.toString() + 'px';
        }

        const height = Math.round(parseFloat(window.getComputedStyle(node).getPropertyValue('height')));
        const width = Math.round(parseFloat(window.getComputedStyle(node).getPropertyValue('width')));
        let fontSize = 128;

        setFontSize(fontSize);
        while (fontSize > 0 && (node.scrollWidth > width || node.scrollHeight > height)) {
            fontSize -= 1;
            setFontSize(fontSize);
        }
        if (fontSize == 0) {
            fontSize = 16;
        }
        setFontSize(fontSize * scale);
    })
}

export const tomorrow0hrsLocal = (): Date => {
    const [year, month, day] = todayYmdLocal();
    return new Date(year, month - 1, day + 1);
}

export const dateToYmdUtc = (date: Date): [number, number, number] => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return [year, month, day];
}

export const dateToYmdLocal = (date: Date): [number, number, number] => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day];
}

export const ymdToString = (y: number, m: number, d: number): string => {
    const ys = y.toString().padStart(4, '0');
    const ms = m.toString().padStart(2, '0');
    const ds = d.toString().padStart(2, '0');
    return `${ys}-${ms}-${ds}`;
}

// Returns dates as year, month, day
export const todayYmdLocal = (): [number, number, number] => dateToYmdLocal(new Date());
export const yesterdayYmdLocal = (): [number, number, number] => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return dateToYmdLocal(d);
}
export const tomorrowYmdLocal = (): [number, number, number] => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return dateToYmdLocal(d);
}

export const todayYmdLocalString = (): string => ymdToString(...todayYmdLocal());
export const yesterdayYmdLocalString = (): string => ymdToString(...yesterdayYmdLocal());
export const tomorrowYmdLocalString = (): string => ymdToString(...tomorrowYmdLocal());
