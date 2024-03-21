<script lang="ts">
    import { blankspaceApiGuess } from '$lib/links';
    import { sleepMs } from '$lib/utils';
    import GuessInput from './GuessInput.svelte';
    import VirtualKeyboard from '$lib/ui/VirtualKeyboard.svelte';
    import { BsResponseParser } from '$lib/blankspace-game-api';
    import { error } from '@sveltejs/kit';
    import { onMount, tick } from 'svelte';
    import { goto } from '$app/navigation';
    import { bsResultLink } from '$lib/links';

    export let data;
    $: hints = data.bsResponse.result!.hints;
    $: won = data.bsResponse.result?.won;
    $: lost = data.bsResponse.result?.lost;

    onMount(() => {
        if (won || lost) {
            handleWonOrLost();
        }
    });

    let flippedHint: number | null = null;
    let lastRevealedHint: number = data.bsResponse.result!.hints.length - 2;
    let invalidWord = false;

    let invalidWordResetTimeout: NodeJS.Timeout | null = null;

    const submitGuess = async (guess: string) => {
        const res = await fetch(blankspaceApiGuess(data.setId, data.gameId, guess), { method: "POST" });
        const resJson = await res.json();
        const parseRes = BsResponseParser.safeParse(resJson);
        if (!parseRes.success) {
            error(500);
        }
        if (parseRes.data.error && !parseRes.data.invalidWord) {
            error(500);
        } else if (parseRes.data.error) {
            invalidWord = true;
            if (invalidWordResetTimeout) clearTimeout(invalidWordResetTimeout);
            invalidWordResetTimeout = setTimeout(() => invalidWord = false, 1500);
        } else if (parseRes.data.result) {
            data.bsResponse = parseRes.data;
        }

        await tick();
    }

    const handleWonOrLost = async () => {
        goto(bsResultLink(data.setId, data.gameIdx));
    }

    const handleGuess = async () => {
        if (flippedHint === null) return;
        const guess = hints[flippedHint].guess;
        await submitGuess(guess);


        if (won || lost) {
            handleWonOrLost();
        }

        if (won || lost || invalidWord) {
            return;
        }

        await sleepMs(500);

        flippedHint = null;

        await sleepMs(1000);

        lastRevealedHint = hints.length - 1;

        await sleepMs(750);

        flippedHint = lastRevealedHint;

        return Promise.resolve();
    }

    const handleKeyPress = async ({ detail: { key, del, enter }}: { detail: { key: string, del: boolean, enter: boolean }}) => {
        if (flippedHint === null || hints[flippedHint].submitted) {
            return;
        }
        if (enter) {
            handleGuess();
            return;
        }
        if (del) {
            hints[flippedHint].guess = hints[flippedHint].guess.slice(0, -1)
            return;
        }
        hints[flippedHint].guess += key;
    }

    onMount(async () => {
        await sleepMs(500);
        lastRevealedHint = data.bsResponse.result!.hints.length - 1;
        await sleepMs(1000);
        flippedHint = lastRevealedHint;
    })
</script>

<div id="root">
    <div>
    </div>
    <div class="card-container">
        {#each hints as { hint, before, guess, submitted }, idx}
            <div 
                class="card"
                class:away={lastRevealedHint < idx}
                class:hint-shown={flippedHint === idx}
            >
                <div class="hint-side">
                    {#if before}
                        <div>
                            <GuessInput incorrect={!won && submitted} value={guess}/>
                            <span> {hint} </span>
                        </div>
                    {:else}
                        <div>
                            <span> {hint} </span> 
                            <GuessInput incorrect={!won && submitted} value={guess}/>
                        </div>
                    {/if}
                    <!-- <button on:click={() => {guess=".skipped"; handleGuess();}}> Skip </button> -->
                </div>
                <button class="back-side">
                    {#if submitted && before}
                        <div> <span class:skipped={guess === ".skipped"}> {guess.replace(".", "")} </span> {hint}  </div>
                    {:else if submitted}
                        <div> {hint} <span class:skipped={guess === ".skipped"}> {guess.replace(".", "")} </span> </div>
                    {:else}
                        <div />
                    {/if}
                    {#if !submitted}
                        <h1> Hint #{idx + 1} </h1>
                    {/if}
                </button>
            </div>
        {/each}
    </div>
    <div />
    <div style="align-self: end; margin-bottom: 1rem">
        <VirtualKeyboard bind:invalidWord enterDisabled={flippedHint === null || !hints[flippedHint]?.guess} on:keypress={handleKeyPress} />
    </div>
</div>

<style>
    #root {
        height: 100vh;
        height: 100svh;
        max-width: 50rem;
        margin: 0 auto;
        display: grid;
        grid-template-rows: 5rem 10rem 10rem 1fr;
        overflow: hidden;
        place-items: stretch;
        background: white;
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
        width: calc(min(90vw, 45rem));
        margin: 0 calc(min(5vw, 2.5rem));
        height: 100%;
        max-width: 50rem;
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

    .hint-side button {
        position: absolute;
        bottom: 0.75rem;
        right: 0.75rem;
        font-size: 1.1rem;
        outline: none;
        border: none;
        background-color: #c0c0c0;
        font-weight: 600;
        border-radius: 0.25rem;
        padding: 0.25rem 1rem;
    }

    .hint-side button:active {
        background: #808080;
    }

    .back-side div {
        text-transform: uppercase;
        font-weight: bold;
        margin-top: 0.5rem;
    }

    .back-side div span {
        font-weight: bold;
        color: red;
    }

    .back-side div span.skipped {
        font-style: italic;
        color: black;
        font-size: 0.7rem;
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
        transform: translateY(-25%) translateX(100vw);
    }

    .card:nth-child(2) {
        transform: translateY(0%);
    }

    .card:nth-child(2).away {
        transform: translateY(0%) translateX(100vw);
    }

    .card:nth-child(3) {
        transform: translateY(25%);
    }

    .card:nth-child(3).away {
        transform: translateY(25%) translateX(100vw);
    }

    .card:nth-child(4) {
        transform: translateY(50%);
    }

    .card:nth-child(4).away {
        transform: translateY(50%) translateX(100vw);
    }

    .card:nth-child(5) {
        transform: translateY(75%);
    }

    .card:nth-child(5).away {
        transform: translateY(75%) translateX(100vw);
    }
</style>