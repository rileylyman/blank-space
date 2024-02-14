export const sleepMs = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
