<script lang="ts">
    import { BS_GAME_LIST } from "$lib/links";
    import { type BsResponse } from "$lib/blankspace-game-api";

    export let response: BsResponse;
    if (!response.result || !response.result.hints.length || !response.result.hints.every((h) => h.submitted)) {
        throw new Error("invalid game");
    }
    $: result = response.result!;
    $: target = response.result!.target!;
    $: hintsRemaining = 5 - result.hints.length;

    const scoreString = () => {
        if (result.hints.length === 1) return ", a perfect 5-star score!"
        if (result.hints.length === 2) return " for a cool 4 stars."
        if (result.hints.length === 3) return " for a respectable 3 stars."
        if (result.hints.length === 4) return " and earned 2 stars."
        if (result.hints.length === 5) return " and earned a humble 1 star."
        return "";
    }
    const getFormattedHints = () => result.fullHints.map((hint) => hint.replace(target, `<b><em>${target}</em></b>`));
</script>

<div id="root">
    <h1>You { result.won ? 'Won!' : 'Lost!' }</h1>
    <br/>
    <p>The target word was <em><b>{result.target}</b></em></p>
    <br />
    {#if result.won}
        <h2> Points </h2>
        <br/>
        <p>
            You left {hintsRemaining} hint{hintsRemaining !== 1 ? 's' : ''} remaining{scoreString()}
        </p>
        <br/>
    {/if}
    <h2>Hints </h2>
    <ul>
    {#each getFormattedHints() as hint}
        <li> 
            {@html hint}
        </li>
    {/each}
    </ul>
    <br/>
    <h2>Your Guesses </h2>
    <ul>
    {#each result.hints as { guess, before, hint }}
        <li> 
            {#if before} <span class:noline={guess === target}>{guess.toLocaleLowerCase()}</span> {/if}
            {hint.toLocaleLowerCase()}
            {#if !before} <span class:noline={guess === target}>{guess.toLocaleLowerCase()}</span> {/if}
        </li>
    {/each}
    </ul>
    <br/>
    <a href={BS_GAME_LIST}>Go Back</a>
</div>

<style>
    #root {
        width: 100%;
        height: 100%;
        padding: 1rem;
    }

    span {
        text-decoration: line-through;
        font-weight: bold;
        font-style: italic;
    }

    .noline {
        text-decoration: none;
    }
</style>