<script lang="ts">
    import { BS_GAME_LIST } from "$lib/links";
    import { type BsResponse } from "$lib/blankspace-game-api";
    import Fa from 'svelte-fa';
    import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';;;;

    export let response: BsResponse;
    if (!response.result || !response.result.hints.length || !response.result.hints.every((h) => h.submitted)) {
        throw new Error("invalid game");
    }
    $: result = response.result!;
    $: target = response.result!.target!;
    $: hints = response.result!.hints;
    $: fullHints = response.result!.fullHints;
    $: hintsRemaining = 5 - result.hints.length;

    const scoreString = () => {
        if (result.hints.length === 1) return ", a perfect 5-star score!"
        if (result.hints.length === 2) return " for a cool 4 stars."
        if (result.hints.length === 3) return " for a respectable 3 stars."
        if (result.hints.length === 4) return " and earned 2 stars."
        if (result.hints.length === 5) return " and earned a humble 1 star."
        return "";
    }
    $: formattedHints = result.fullHints.map((hint) => hint.replace(target, `<u>${target}</u>`));
    $: formattedGuesses = hints.map(({ guess }, i) => fullHints[i].replace(target, `<u>${guess}</u>`));
    $: guessTable = formattedHints.map((hint, i) => [formattedGuesses.at(i), hint]);

    let selectedTags: string[] = [
    ];

    let tags = [
        "difficult",
        "easy",
        "bad hint order",
        "loved it",
        "hated it",
        "exciting",
        "boring",
        "frustrating",
        "confusing",
        "funny",
        "questionable hints",
    ];

    let thumbsUp: boolean | null = null;
</script>

<div id="root">
    <h1>You { result.won ? 'Won!' : 'Lost!' }</h1>
    <div class="rating"> 
        <div class="thumbs">
        <span>Rate This Round:</span> 
        <button on:click={() => thumbsUp = false} class:selected={thumbsUp === false}><Fa size="1.5x" icon={faThumbsDown} /> </button>
        <button on:click={() => thumbsUp = true} class:selected={thumbsUp === true}><Fa size="1.5x" icon={faThumbsUp} /> </button>
        </div>
        <div class="tags">
            {#each tags as tag}
                <button 
                    on:click|preventDefault={() => {
                        if (selectedTags.includes(tag)) {
                            selectedTags = selectedTags.filter((t) => t !== tag);
                        } else {
                            selectedTags = [tag, ...selectedTags];
                        }
                        console.log(selectedTags);
                    }}
                    class:selected={selectedTags.includes(tag)}
                >
                    {tag.toLocaleLowerCase()}
                </button>
            {/each}
        </div>
    </div>
    <div class="feedback">
        <h2> Leave your feedback: </h2>
        <textarea placeholder="(optional) enter any feedback you might have" />
    </div>
    <button class="submit"> Submit </button>
    <div class="guess-table"> 
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
</div>

<style>
    #root {
        width: 100%;
        height: 100%;
        padding: 1rem;
        display: grid;
        align-items: center;
        justify-items: stretch;
    }

    .thumbs {
        display: grid;
        grid-template-columns: 5fr 1fr 1fr;
        grid-column-gap: 1rem;
        margin-bottom: 0.5rem;
        align-items: center;
    }

    .thumbs span {
        font-weight: bold;
        font-size: 1.5rem;
    }

    .thumbs button {
        display: grid;
        place-items: center;
        outline: none;
        border: 1px solid black;
        background-color: white;
        border-radius: 0.25rem;
        height: 3rem;
        aspect-ratio: 1/1;
    }

    .thumbs button.selected {
        background: rgb(250, 113, 79);
        border: none;
        color: white;
    }

    .thumbs button:last-of-type.selected {
        background-color: rgb(80, 194, 104);
    }
    
    .tags {
        display: flex;
        justify-content: start;
        flex-flow: row wrap;
        width: 100%;
        margin-left: -0.25rem;
    }

    .tags button {
        border-radius: 0.5rem;
        border: 1px solid black;
        margin: 0.25rem;
        padding: 0 0.25rem;
        background: #f7f7f7;
        outline: none;
    }

   .tags button.selected {
        background: black;
        color: white;
    }

    .feedback textarea {
        height: 15vh;
        width: 100%; 
        padding: 0.25rem 1rem;
        overflow: hidden;
        border: 1px solid black;
    }

    .guess-table {
        background-color: black;
        display: grid;
        column-gap: 1px;
        row-gap: 1px;
        border: 1px solid black;
        grid-template-columns: 1fr 1fr;
        font-size: 0.85rem;
    }

    .guess-table div {
        background-color: white;
        padding: 0.1rem 0.3rem;
    }

    .guess-table .col-title {
        font-weight: bold;
        font-size: 1.2rem;
    }

    button.submit {
        background: black;
        color: white;
        border: none;
        border-radius: 0.25rem;
        font-size: 1.5rem;
        width: 80%;
        justify-self: center;
        margin: 0.5rem 0 1rem;
        height: 3rem;
    }
</style>