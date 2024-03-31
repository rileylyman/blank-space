<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { BS_HOME_SKIP } from "$lib/links";
    import { onMount } from "svelte";
    import wordDb from '$lib/word-db';

    const from = $page.url.searchParams.get("from") ?? BS_HOME_SKIP;

    let numChunksRecvd = 0;
    let totalChunks = 1;
    $: progressPct = (numChunksRecvd / totalChunks) * 100;

    onMount(async () => {
        let db = await wordDb.initWordDb();
        if (!db) {
            // XXX
            return;
        }

        document.cookie = "no_word_db=1; max-age=2592000"
        console.log(document.cookie);

        totalChunks = (await (await fetch("/api/dictionary")).json()).numChunks;
        let promises = new Array<Promise<void>>();
        for (let i = 0; i < totalChunks; i++) {
            let p = fetch("/api/dictionary?chunk=" + i).then((r) => r.json().then((chunk) => {
                if (db) {
                    wordDb.addWordDbData(db, chunk.wordList);
                }
                numChunksRecvd += 1;
            }));
            promises.push(p);
        }

        await Promise.all(promises);
        progressPct = 100;

        goto(from);
    });
</script>

<div id="root">
    <h1> Loading dictionary </h1>
    <p> this should only happen once per device </p>
    <div class="progress-bar-container">
        <div class="progress-bar" style={`width: ${progressPct}%;`}>
        </div>
    </div>
</div>

<style>
    #root {
        margin: 0 auto;
        width: 100vw;
        max-width : 50rem;
        height: 100vh;
        height: 100svh;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        background: white;
    }

    h1 {
        font-size: 1.5rem;
        text-transform: uppercase;
    }

    p {
        font-style: italic;
        margin-bottom: 2.5rem;
    }

    .progress-bar-container {
        position: relative;
        width: 80%;
        height: 5rem;
        border: 2px solid black;
        border-radius: 1rem;
        overflow: hidden;
    }

    .progress-bar {
        position: absolute;
        height: 100%;
        left: 0;
        background: #c0c0c0;
    }
</style>