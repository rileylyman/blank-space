<script lang="ts">
    interface Hint {
        hint: string;
        before: boolean;
        guess: string;
        index: number;
    }

    import { bsGameHints } from '$lib/schema';
    export let data;
    const game = data.game;

    let availHints = bsGameHints(game).map((fullHint: string, index: number) => {
        const hint = fullHint.replace(game.target, '').trim();
        const before = fullHint.indexOf(game.target) < fullHint.indexOf(hint);
        return {
            hint,
            before,
            guess: "",
            index,
        }
    });

    let scrollContainer: HTMLDivElement | null = null;
    let screenWidth = 0;
    const handleInput = (e: Event & { currentTarget: HTMLInputElement }) => {
        if (!scrollContainer) return;
        scrollContainer.scrollLeft += screenWidth;
    }
</script>

<svelte:window bind:outerWidth={screenWidth} />

<div id="root">
    <div>
        <p> Your Guesses: </p>
    </div>
    <div
        class="card-container"
        bind:this={scrollContainer}
        on:touchmove|preventDefault={() => {}}
        on:scroll|preventDefault={() => {}}
    >
        {#each availHints as { hint }}
            <div class="card">
                <input on:change={handleInput} type="text" placeholder={hint} />
            </div>
        {/each}
    </div>
</div>

<style>
    #root {
        height: 100vh;
        height: 100svh;
        display: grid;
        grid-template-rows: 0.5fr 1.3fr 1fr 1fr;
        overflow: hidden;
        place-items: center;
    }

    .card-container {
        height: 100%; 
        width: 100%; 
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        scroll-behavior: smooth;
    }

    .card-container::-webkit-scrollbar {
        display: none;
    }

    .card {
        background: lightgrey;
        border-radius: 0.5rem;
        border: 1px solid black;
        display: grid;
        place-items: center;
        width: 90vw;
        margin: 0 5vw;
        height: 90%;
    }
</style>