export class WordDB {
    db: IDBDatabase | null = null;

    private constructor(db: IDBDatabase | null) {
        this.db = db;
    }

    static async new(): Promise<WordDB> {
        let dbResolver: ((value: IDBDatabase | null) => void) | null  = null;
        const dbPromise = new Promise<IDBDatabase | null>((resolve) => dbResolver = resolve);

        const req = indexedDB.open("dictionary", 1);
        req.onerror = () => {
            dbResolver!(null);
        }
        req.onsuccess = async (event) => {
            const db = (event.target as any).result;
            dbResolver!(db);
            db.onerror = (event: Event) => {
                console.error("indexed db encountered an error", event);
            }
        }
        req.onupgradeneeded = (event) => {
            const db = (event.target as any).result as IDBDatabase;
            db.createObjectStore("words", { keyPath: "word" });
        }

        let ret = new WordDB(await dbPromise);
        await ret.fetchData();
        return ret;
    }

    async isOperational(): Promise<boolean> {
        return !!this.db && await this.get("__loaded");
    }

    async fetchData() {
        if (!this.db || await this.get("__loaded")) return;

        try {
            console.log("starting data fetch");
            const res = await (await fetch("/api/dictionary")).json();
            console.log("got response back");
            if (res.wordList) {
                this.add(res.wordList);
            }

            console.log("testing if salamander is present");
            // Test a random word and add "__loaded" marker if present.
            if (await this.get("salamander")) {
                console.log("it is present, setting __loaded");
                this.add(["__loaded"]);
            }
        } catch (err) {
            console.error("error fetching dictionary from server", err);
        }
    }

    async add(data: Array<string>): Promise<boolean> {
        if (!this.db) return false;

        console.log("starting data insert");

        let resolver: ((value: boolean) => void) | null = null;
        let resultPromise = new Promise<boolean>((resolve) => resolver = resolve);

        const transaction = this.db.transaction("words", "readwrite")
        const objStore = transaction.objectStore("words");
        transaction.onerror = (event) => resolver!(false);
        transaction.oncomplete = (event) => resolver!(true);

        data.forEach((word) => objStore.put({ word }));

        console.log("finished data insert");

        return await resultPromise;
    }

    async get(word: string): Promise<boolean> {
        if (!this.db) return false;

        let resolver: ((value: boolean) => void) | null = null;
        let resultPromise = new Promise<boolean>((resolve) => resolver = resolve);

        const req = this.db.transaction("words").objectStore("words").get(word);
        req.onerror = (event) => resolver!(false);
        req.onsuccess = (event) => resolver!((event.target as any).result !== undefined);

        return await resultPromise;
    }

}