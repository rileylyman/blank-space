<script lang="ts">
    interface Hint {
        hint: string;
        before: boolean;
        guess: string;
        index: number;
    }

    import { bsGameHints } from '$lib/schema';
    import GuessInput from './GuessInput.svelte';
    export let data;
    const game = data.game;

    let hints = bsGameHints(game).map((fullHint: string, index: number) => {
        const hint = fullHint.replace(game.target, '').trim();
        const before = fullHint.indexOf(game.target) < fullHint.indexOf(hint);
        return {
            hint,
            before,
            guess: "",
            index,
        }
    });

    let currentHint = 0;
    let inputValues = ["", "", "", "", "", ""];
    const handleInput = (idx: number) => async () => {
        if (idx >= hints.length) return;

        hints[idx].guess = inputValues[idx];
        showHint[idx] = false;

        currentHint += 1;
    }
    let reveal = true;
    let showHint = [false, false, false, false, false];
</script>

<div id="root">
    <div>
    </div>
    <div class="card-container">
        {#each hints as { hint, before, guess }, idx}
            <div 
                class="card"
                class:away={currentHint < idx}
                class:hint-shown={showHint[idx]}
            >
                <div class="hint-side">
                    {#if before}
                        <div>
                            <GuessInput on:change={handleInput(idx)} bind:value={inputValues[idx]}/>
                            <span> {hint} </span>
                        </div>
                    {:else}
                        <div>
                            <span> {hint} </span> 
                            <GuessInput on:change={handleInput(idx)} bind:value={inputValues[idx]}/>
                        </div>
                    {/if}
                </div>
                <button on:click={() => showHint[idx] = true} class="back-side">
                    {#if guess}
                        <p> {guess} </p>
                    {/if}
                </button>
            </div>
        {/each}
    </div>
</div>

<style>
    #root {
        height: 100vh;
        display: grid;
        grid-template-rows: 5rem 10rem 1fr 1fr;
        overflow: hidden;
        place-items: stretch;
    }

    .card-container {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        position: relative;
    }

    .card {
        position: absolute;
        display: grid;
        align-items: start;
        justify-items: center;
        width: 90vw;
        margin: 0 5vw;
        height: 100%;
        background: transparent;
    }

    .hint-side, .back-side {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border: 1px solid black;
        border-radius: 0.5rem;
        display: grid;
        transition: transform 500ms;
        place-items: center;
        transform-style: preserve-3d;
        transition: transform 1s;
        outline: none;
    }

    .hint-side {
        transform: rotateX(180deg);
    }

    .back-side {
        transform: rotateX(0deg);
        background: #f0f0f0;
        align-items: start;
    }

    .hint-side div {
        display: flex;
        justify-content: center;
        font-family: 'Source Code Pro', 'Fira Sans', sans-serif;
    }

    .hint-side span {
        font-size: 1.5rem;
        font-weight: bold;
        text-transform: uppercase;
    }

    .hint-shown > .hint-side {
        transform: rotateX(0deg);
    }

    .hint-shown > .back-side {
        transform: rotateX(180deg);
    }

    .card.away {
        transform: translateX(100vw);
    }

    .card:nth-child(1) {
        transform: translateY(-25%);
    }

    .card:nth-child(1).away {
        transform: translateX(100vw);
    }

    .card:nth-child(2) {
        transform: translateY(0%);
    }

    .card:nth-child(2).away {
        transform: translateY(10%) translateX(100vw);
    }

    .card:nth-child(3) {
        transform: translateY(25%);
    }

    .card:nth-child(3).away {
        transform: translateY(20%) translateX(100vw);
    }

    .card:nth-child(4) {
        transform: translateY(50%);
    }

    .card:nth-child(4).away {
        transform: translateY(30%) translateX(100vw);
    }

    .card:nth-child(5) {
        transform: translateY(75%);
    }

    .card:nth-child(5).away {
        transform: translateY(40%) translateX(100vw);
    }
</style>