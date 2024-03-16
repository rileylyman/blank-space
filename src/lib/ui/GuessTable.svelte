<script lang="ts">
    import Fa from "svelte-fa";
    import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
    export let target: string;
    export let fullHints: string[];
    export let guesses: string[];

    $: formattedHints = fullHints.map((hint) => hint.replace(target, `<u>${target}</u>`));
    $: formattedGuesses = guesses;
    $: guessTable = formattedHints.map((hint, i) => [formattedGuesses.at(i), hint]);
</script>

<div id="root"> 
    <div class="col-title">
        Hint
    </div>
    <div class="col-title">
        Guess
    </div>
    {#each guessTable as [guess, hint]}
        <div>
            {@html hint} 
        </div>
        <div class="guess" class:correct={guess === target}>
            {#if guess} {guess} {/if}
            {#if guess === target}
                <span><Fa icon={faCheck} /></span>
            {:else if guess}
                <span><Fa icon={faX} size="0.8x" /></span>
            {/if}
        </div>
    {/each}
</div>

<style>
#root {
    background-color: black;
    border: 1px solid black;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1px;
    row-gap: 1px;
    font-size: 0.85rem;
}

#root div {
    background-color: white;
    padding: 0.1rem 0.3rem;
}

#root .col-title {
    font-weight: bold;
    font-size: 1.2rem;
}

.guess {
    display: flex;
    align-items: center;
    color: red;
    font-weight: bold;
}

.guess span {
    margin-left: 0.5rem;
    font-size: 1rem;
    transform: translateY(-1px);
}

.guess.correct {
    color: green;
}
</style>