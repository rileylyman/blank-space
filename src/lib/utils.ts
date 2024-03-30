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

class StoragePolyfill implements Storage {
    storage: Map<string, string>;
    length: number;
    key: any;

    constructor() {
        this.storage = new Map<string, string>();
        this.length = 0;
    }

    getItem(key: string): string | null {
        return this.storage.get(key) ?? null;
    }

    setItem(key: string, value: string) {
        this.storage.set(key, value);
        this.length = this.storage.size;
    }

    removeItem(key: string) {
        this.storage.delete(key);
        this.length = this.storage.size;
    }

    clear() {
        this.storage.clear();
    }
}

const storagePoly = new StoragePolyfill();

export const isLocalStorageAvailable = () => {
    try {
        localStorage.setItem("test", "test");
        localStorage.removeItem("test");
        return true;
    } catch(e) {
        return false;
    }
}

export const getStorage = (): Storage => {
    return isLocalStorageAvailable() ? localStorage : storagePoly;
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
