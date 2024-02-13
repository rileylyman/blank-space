export const sleepMs = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
export const todayYmd = (): [number, number, number] => dateToYmdLocal(new Date());
export const yesterdayYmd = (): [number, number, number] => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return dateToYmdLocal(d);
}
export const tomorrowYmd = (): [number, number, number] => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return dateToYmdLocal(d);
}

export const todayYmdString = (): string => ymdToString(...todayYmd());
export const yesterdayYmdString = (): string => ymdToString(...yesterdayYmd());
export const tomorrowYmdString = (): string => ymdToString(...tomorrowYmd());
