<script lang="ts">
    import { SCORES } from "$lib/constants";
    import { bsFeedbackLink } from "$lib/links";
    import GuessTable from "$lib/ui/GuessTable.svelte";

    export let data;

    $: won = data.bsResponse.result!.won;
    // $: won = false;
    $: score = won ? SCORES.at(data.bsResponse.result!.hints.length - 1)! : 0;
    $: hints = data.bsResponse.result!.hints;
    $: target = data.bsResponse.result!.target!;
    $: fullHints = data.bsResponse.result!.fullHints;
    $: guesses = hints.map(({ guess }) => guess);
</script>

<div id="root">
    <div class="score">
        <div class:lost={!won}>
            {hints.length} guess{hints.length !== 1 ? 'es' : ''}
        </div>
    </div>
    <div class="points">
        <p class="head">{ won ? 'WINNER!' : 'TOO BAD!' }</p>
        <p class="number"> {score} pt{score != 1 ? 's' : ''}. </p>
        <p> added to today's </p>
        <p> total score </p>
    </div>
    <div class="guesses">
        <GuessTable {target} {fullHints} {guesses}/>
    </div>
    <div class="button">
        <a href={bsFeedbackLink(data.gameId)}> Add Feedback </a>
    </div>
</div>

<style>
    #root {
        width: 100vw; 
        height: 100vh;
        height: 100svh;
        display: grid;
        grid-template-rows: 1fr 1fr 1.25fr 0.75fr;
        place-items: stretch;
    }

    .score {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    
    .score div {
        display: grid;
        place-items: center;
        border-radius: 50%;
        aspect-ratio: 1 / 1;
        background-color: rgb(80, 194, 104);
        border: 2px solid black;
        width: 30%;
        font-size: 1.25rem;
        text-transform: uppercase;
        white-space: nowrap;
    }

    .score div.lost {
        background: rgb(250, 113, 79);
    }

    .points {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .points p {
        text-align: center;
        text-transform: uppercase;
    }

    .points p.head {
        font-size: 1.25rem;
    }

    .points p.number {
        font-size: 2rem;
    }

    .guesses {
        width: 90%;
        height: 90%;
        place-self: center;
    }

    .button {
        display: grid;
        place-items: center;
    }

    .button a {
        color: white;
        text-decoration: none;
        text-transform: uppercase;
        background: black;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        font-size: 1.5rem;
    }
</style>