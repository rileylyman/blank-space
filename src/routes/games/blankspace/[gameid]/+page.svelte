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
        console.log("hey eh ye e");
        if (won || lost) {
            handleWonOrLost();
        }
    });

    let flippedHint: number | null = null;
    let lastRevealedHint: number = data.bsResponse.result!.hints.length - 1;
    let invalidWord = false;

    let invalidWordResetTimeout: NodeJS.Timeout | null = null;

    const submitGuess = async (guess: string) => {
        const res = await fetch(blankspaceApiGuess(data.gameId, guess), { method: "POST" });
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
        console.log("handleWon");
        goto(bsResultLink(data.gameId));
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

        await sleepMs(1000);

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

    const handleHintClick = (idx: number) => () => {
        if (idx !== lastRevealedHint || hints[lastRevealedHint].submitted) {
            return;
        }
        flippedHint = lastRevealedHint;
    }
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
                            <GuessInput strike={!won && submitted} value={guess}/>
                            <span> {hint} </span>
                        </div>
                    {:else}
                        <div>
                            <span> {hint} </span> 
                            <GuessInput strike={!won && submitted} value={guess}/>
                        </div>
                    {/if}
                </div>
                <button on:click={handleHintClick(idx)} class="back-side">
                    {#if submitted && before}
                        <div class="top-guess"> <span> {guess} </span> {hint}  </div>
                    {:else if submitted}
                        <div class="top-guess"> {hint} <span> {guess} </span> </div>
                    {:else}
                        <div />
                    {/if}
                    {#if !submitted}
                        <h1> {idx > 0 ? `Hint #${idx + 1}` : 'Tap to Start'} </h1>
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