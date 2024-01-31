<script lang="ts">
    export let target: string;
    export let fullHints: string[];
    export let guesses: string[];

    $: formattedHints = fullHints.map((hint) => hint.replace(target, `<u>${target}</u>`));
    $: formattedGuesses = guesses.map((guess, i) => fullHints[i].replace(target, `<u>${guess}</u>`));
    $: guessTable = formattedHints.map((hint, i) => [formattedGuesses.at(i), hint]);
</script>

<div id="root"> 
    <div class="col-title">
        Guess
    </div>
    <div class="col-title">
        Hint
    </div>
    {#each guessTable as [guess, hint]}
        <div class="guess">
            {#if guess} {@html guess} {/if}
        </div>
        <div>
            {@html hint} 
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
</style>