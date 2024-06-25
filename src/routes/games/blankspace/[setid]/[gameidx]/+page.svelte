<script lang="ts">
    import { ACCOUNT, blankspaceApiGuess } from '$lib/links';
    import { sleepMs } from '$lib/utils';
    import GuessInput from './GuessInput.svelte';
    import VirtualKeyboard from '$lib/ui/VirtualKeyboard.svelte';
    import { BsResponseParser, updateGameState, type BsResponse } from '$lib/blankspace-game-api';
    import { onMount, tick } from 'svelte';
    import { goto, invalidateAll } from '$app/navigation';
    import { bsResultLink } from '$lib/links';
    import deepEqual from 'deep-equal';
    import { page } from '$app/stores';

    export let data;

    let wordList: string[] = [];

    let flippedHint: number | null = null;
    let lastRevealedHint: number = data.bsResponse.result!.hints.length - 2;
    let invalidWordError = "";
    let invalidWordResetTimeout: NodeJS.Timeout | null = null;

    let lastResponse: BsResponse | null = null;

    $: feat = data.features;
    $: peacefulMode = data.prefs.peacefulMode;
    $: hints = data.bsResponse.result!.hints;
    $: won = data.bsResponse.result?.won;
    $: lost = data.bsResponse.result?.lost;
    $: currScore = data.bsResponse.result?.score ?? 25;
    $: showGuesses = true;
    $: prevGuesses = hints.slice(0, -1).map(({ guess }) => guess);
    $: disabledKeys = peacefulMode ? new Array(...prevGuesses.reduce((set: Set<string>, guess: string) => {
        for (let c of guess) {
            if (!data.bsGame.target.includes(c)) { set.add(c) }
        };
        return set;
    }, new Set())).join("") : "";
    $: goodKeys = peacefulMode ? new Array(...prevGuesses.reduce((set: Set<string>, guess: string) => {
        for (let c of guess) {
            if (data.bsGame.target.includes(c)) { set.add(c) }
        };
        return set;
    }, new Set())).join("") : "";
    $: targetLength = peacefulMode ? data.bsGame.target.length : undefined;

    onMount(async () => {
        if (won || lost) {
            handleWonOrLost();
            return;
        }
        recalculateFlippedAndRevealed(true);

        fetch("/api/dictionary").then(res => res.json().then(res => {
            if (res.wordList) {
                wordList = res.wordList;
            }
        }));
    });

    const recalculateFlippedAndRevealed = async (firstTime: boolean) => {
        flippedHint = null;
        lastRevealedHint = data.bsResponse.result!.hints.length - 2;
        await sleepMs(500);
        lastRevealedHint = data.bsResponse.result!.hints.length - 1;
        await sleepMs(1000);
        flippedHint = lastRevealedHint;
    }

    const reloadPage = () => {
        invalidateAll();
        recalculateFlippedAndRevealed(false);
    }

    const submitGuess = async (guess: string) => {
        let fetchRes = fetch(blankspaceApiGuess(data.setId, data.gameId, guess, !!wordList.length), { method: "POST" });
        if (wordList.length) {
            fetchRes.then(async (res) => {
                const resJson = await res.json();
                const parseRes = BsResponseParser.safeParse(resJson);
                if (!parseRes.success) {
                    console.error("failed to parse server response");
                } else if (!deepEqual(parseRes.data, lastResponse)) {
                    console.log(JSON.stringify(parseRes.data));
                    console.log(JSON.stringify(lastResponse));
                    console.error("server response does not match");
                    reloadPage();
                }
            });
        }

        let res: BsResponse;
        if (wordList.length) {
            const dictionary = async (word: string): Promise<boolean> => wordList.includes(word);
            res = await updateGameState(guess, prevGuesses, won ?? false, data.bsGame, dictionary);
            lastResponse = res;
        } else {
            res = await (await fetchRes).json();
            console.log("looked up from server");
        }

        if (res.error && !res.invalidWord) {
            reloadPage();
        } else if (res.error) {
            invalidWordError = res.error;
            if (invalidWordResetTimeout) clearTimeout(invalidWordResetTimeout);
            invalidWordResetTimeout = setTimeout(() => invalidWordError = "", 1500);
        } else if (res.result) {
            data.bsResponse = res;
        }

        await tick();
    }

    const handleWonOrLost = async () => {
        goto(bsResultLink(data.setId, data.gameIdx, data.from));
    }

    const handleGuess = async () => {
        if (flippedHint === null) return;
        const guess = hints[flippedHint].guess;
        if (!guess) return;

        await submitGuess(guess);

        if (won || lost) {
            await handleWonOrLost();
        }

        if (won || lost || invalidWordError) {
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
        if (!peacefulMode || hints[flippedHint].guess.length < (targetLength ?? 0)) {
            hints[flippedHint].guess += key.toLocaleLowerCase();
        }
    }

    let focusCapture: HTMLElement;
</script>

<button style="position: absolute; z-index: -1; opacity: 0" bind:this={focusCapture}  />

<div id="root">
    <div class="top-bar">
        <button class="break" on:click={() => goto(data.from)}>
            Pause
        </button>
        <button class="break" on:click={() => goto(ACCOUNT + "?from=" + $page.url.pathname)}>
            Difficulty
        </button>
        <button class="break" on:click={() => { showGuesses = !showGuesses; focusCapture.focus() }} class:hidden={prevGuesses.length === 0}>
            {showGuesses ? 'Hide Guesses' : 'Show Guesses'}
        </button>
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
                            <GuessInput {targetLength} incorrect={!won && submitted} value={guess}/>
                            <span> {hint} </span>
                        </div>
                    {:else}
                        <div>
                            <span> {hint} </span> 
                            <GuessInput {targetLength} incorrect={!won && submitted} value={guess}/>
                        </div>
                    {/if}
                </div>
                <button class="back-side">
                    {#if submitted && before}
                        <div class="prev-guess">
                            <span>
                                {showGuesses ? guess : "______"}
                            </span> 
                            {hint}
                        </div>
                    {:else if submitted}
                        <div class="prev-guess">
                            {hint}
                            <span>
                                {showGuesses ? guess : "______"}
                            </span> 
                        </div>
                    {:else}
                        <div class="hint-number"> Hint #{idx + 1} </div>
                    {/if}
                </button>
            </div>
        {/each}
    </div>
    <!-- The previous div overflows on the bottom by 220%. This div serves as padding. -->
    <div />
    <div class="ig-score">
        <span> Current Score: </span>
        <h1> {currScore} </h1>
    </div>
    <div style="align-self: end; margin-bottom: 1rem">
        <VirtualKeyboard bind:error={invalidWordError} {disabledKeys} {goodKeys} enterDisabled={flippedHint === null || !hints[flippedHint]?.guess} on:keypress={handleKeyPress} />
    </div>
</div>

<style>
    #root {
        height: 100vh;
        height: 100svh;
        max-width: 30rem;
        margin: 0 auto;
        display: grid;
        grid-template-rows: 6rem 5rem 7.5rem 1fr 1fr;
        overflow: hidden;
        place-items: stretch;
        background: white;
    }

    .top-bar {
        padding: 1rem calc(min(5vw, 2.5rem));
        height: min-content;
        display: grid;
        place-items: center;
        grid-template-columns: 33% 33% 34%;
    }

    .top-bar *:first-child { justify-self: start; }
    .top-bar *:last-child { justify-self: end; }

    .top-bar button {
        outline: none;
        border: none;
        background: #e0e0e0;
        font-size: 1rem;
        padding: 0.2rem 0.5rem;
        border-radius: 0.25rem;
        font-weight: 600;
        text-transform: uppercase;
        text-decoration: none;
        color: black;
        transition: opacity 1000ms;
        margin-left: 0.1rem;
        white-space: nowrap;
        overflow: hidden;
        width: 90%;
    }

    .top-bar .hidden {
        opacity: 0; 
    }

    .ig-score {
        display: grid;
        height: 100%;
        overflow: hidden;
        grid-template-rows: 10% 90%;
        place-items: center;
        padding-top: 0.25rem;
    }

    .ig-score h1 {
        font-size: 5rem;
    }

    .card-container {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        position: relative;
    }

    .card {
        position: absolute;
        width: calc(min(90vw, 27rem));
        margin: 0 calc(min(5vw, 1.5rem));
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

    .back-side {
        display: grid;
        place-items: center;
        transform: rotateX(0deg);
        background: #f0f0f0;
    }

    .back-side div {
        text-transform: uppercase;
        font-weight: bold;
    }

    .back-side div span {
        font-weight: bold;
        color: red;
        display: inline-flex;
    }

    .back-side .hint-number {
        font-size: 1.5rem;
    }

    .back-side .prev-guess {
        align-self: start;
        margin-top: 0.25rem;
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
        transform: translateY(-40%);
    }

    .card:nth-child(1).away {
        transform: translateY(-40%) translateX(100vw);
    }

    .card:nth-child(2) {
        transform: translateY(0%);
    }

    .card:nth-child(2).away {
        transform: translateY(0%) translateX(100vw);
    }

    .card:nth-child(3) {
        transform: translateY(40%);
    }

    .card:nth-child(3).away {
        transform: translateY(40%) translateX(100vw);
    }

    .card:nth-child(4) {
        transform: translateY(80%);
    }

    .card:nth-child(4).away {
        transform: translateY(80%) translateX(100vw);
    }

    .card:nth-child(5) {
        transform: translateY(120%);
    }

    .card:nth-child(5).away {
        transform: translateY(120%) translateX(100vw);
    }
</style>