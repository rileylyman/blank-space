<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import { BS_VETTING_PROGRESS } from '$lib/links.js';
    import { bsGameHints } from '$lib/schema';

    export let data;

    let hist: string[] = [];

    let gameIdx = data.cursor % data.pageLen;

    const vet = async (yes: boolean) => {
        hist = [data.games[gameIdx].target, ...hist];
        data.cursor += 1;
        gameIdx += 1;
        await fetch(BS_VETTING_PROGRESS + "?cursor=" + data.cursor, { method: "POST" });
        if (gameIdx >= data.games.length) {
            await invalidateAll();
            gameIdx = data.cursor % data.pageLen;
        }
    };
</script>

<div id="root">
    <h1> Vetting </h1>

    <div class="card">
        {#if gameIdx < data.games.length}
            <p> {bsGameHints(data.games[gameIdx])}</p>
            <button on:click={() => vet(false)}> Nope, not a thing </button>
            <button on:click={() => vet(true)}> Yes, that's a thing </button>
        {:else}
            <p> Loading ... </p>
        {/if}
    </div>
    <div>
        {#each hist as h}
            <p> h: {h} </p>
        {/each}
    </div>
</div>

<style>
    #root {
        background: white;
        width: 100vw;
        max-width: 30rem;
        margin: 0 auto;
        text-align: center;
        height: 100vh;
        height: 100svh;
    }

    .card {
        border: 1px solid black;
        width: 80%;
        margin: 0 auto;
        margin-top: 3rem;
        border-radius: 1rem;
        display: grid;
        place-items: center; 
        overflow: hidden;
        grid-template-columns: 1fr 1fr;
    }

    .card p {
        grid-column: span 2;
        padding: 2rem;
        font-size: 1.75rem;
    }

    .card button {
        display: grid;
        place-items: center;
        background: #c0c0c0;
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        font-size: 1.25rem;
        border-top: 1px solid black;
        background-color: rgb(80, 194, 104);
    }

    .card button:first-of-type {
        background: rgb(250, 113, 79);
        border-right: 1px solid black;
    }

    .card button:active {
        filter: brightness(75%);
    }
</style>