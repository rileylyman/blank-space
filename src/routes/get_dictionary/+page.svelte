<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { BS_HOME_SKIP } from "$lib/links";
    import { onMount } from "svelte";

    let progressPct = 0;
    let wordList: string[] = [];

    onMount(async () => {
        let numChunks = (await (await fetch("/api/dictionary")).json()).numChunks;
        for (let i = 0; i < numChunks; i++) {
            let chunk = (await (await fetch("/api/dictionary?chunk=" + i)).json());
            wordList = wordList.concat(chunk.wordList);
            progressPct = (chunk.chunk / numChunks) * 100;
        }
        progressPct = 100;

        localStorage.setItem("bsDictionary", wordList.join(","));

        let from = $page.url.searchParams.get("from") ?? BS_HOME_SKIP;
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