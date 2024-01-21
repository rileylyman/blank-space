<script lang="ts">
    interface Hint {
        hint: string;
        before: boolean;
        guess: string;
        index: number;
    }

    import { bsGameHints } from '$lib/schema';
    import { sleepMs } from '$lib/utils';
    import GuessInput from './GuessInput.svelte';
    import VirtualKeyboard from '$lib/ui/VirtualKeyboard.svelte';
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

        await sleepMs(1500);

        showHint[idx] = false;

        await sleepMs(1000);

        currentHint += 1;
    }
    const handleKeyPress = ({ detail: { key }}: { detail: { key: string }}) => {
        console.log(key);
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
                            <GuessInput strike={hints[idx].guess != ""} on:change={handleInput(idx)} bind:value={inputValues[idx]}/>
                            <span> {hint} </span>
                        </div>
                    {:else}
                        <div>
                            <span> {hint} </span> 
                            <GuessInput strike={hints[idx].guess != ""} on:change={handleInput(idx)} bind:value={inputValues[idx]}/>
                        </div>
                    {/if}
                </div>
                <button on:click={() => showHint[idx] = true} class="back-side">
                    {#if guess && before}
                        <div class="top-guess"> <span> {guess} </span> {hint}  </div>
                    {:else if guess}
                        <div class="top-guess"> {hint} <span> {guess} </span> </div>
                    {:else}
                        <div />
                    {/if}
                    <h1> Hint #{idx + 1} </h1>
                </button>
            </div>
        {/each}
    </div>
    <div />
    <div>
        <VirtualKeyboard on:keypress={handleKeyPress} />
    </div>
</div>

<style>
    #root {
        height: 100vh;
        display: grid;
        grid-template-rows: 5rem 10rem 10rem 1fr;
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
        transition: transform 500ms ease-in-out;
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
        transition: transform 1s ease-in-out;
        outline: none;
    }

    .hint-side {
        transform: rotateX(180deg);
        background: white;
    }

    .back-side {
        display: grid;
        grid-template-rows: 25% 1fr 25%;
        transform: rotateX(0deg);
        background: #f0f0f0;
        align-items: start;
    }

    .back-side h1 {
        margin-top: 1rem;
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

    .back-side div {
        text-transform: uppercase;
        font-weight: bold;
        margin-top: 0.5rem;
    }

    .back-side div span {
        text-decoration: line-through;
        font-weight: normal;
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