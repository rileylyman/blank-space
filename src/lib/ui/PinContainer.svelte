<script lang="ts">
    import { type BsGameSet, type BsGameProgress } from "$lib/schema";
    import { goto } from "$app/navigation";
    import Fa from "svelte-fa";
    import { faPersonWalkingArrowLoopLeft, faPlay } from '@fortawesome/free-solid-svg-icons';

    export let progs: BsGameProgress[];
    export let set: BsGameSet;
    export let links: string[];

    $: games = set.expand!.games!.map((game) => {
        const prog = progs.find((p) => p.bs_game === game.id);
        const won = prog?.won ?? false;
        const lost = prog?.lost ?? false;
        const unplayed = prog === undefined;
        return {
            game,
            won,
            lost,
            unplayed,
            prog
        }
    });
</script>

<div id="root">
    {#each games as { game, won, lost, unplayed, prog }, idx}
        <button 
            on:click={() => goto(links[idx])}
            class:won
            class:lost
            class:unplayed
        >
            {#if won}
                <p> {prog?.guesses.split(',').length} {prog?.guesses.split(',').length === 1 ? 'guess' : 'guesses'}</p>
                <p> {game.target} </p>
                <p> {prog?.score} pts </p>
            {:else if lost}
                <p> Lost </p>
                <p> {game.target} </p>
                <p> {prog?.score} pts </p>
            {:else if unplayed}
                <Fa icon={faPlay} size="0.8x" />
            {:else}
                <Fa icon={faPersonWalkingArrowLoopLeft} size="0.8x" />
            {/if}
        </button>
    {/each}
</div>

<style>
    #root {
        width: 100%;
        height: 100%;
        font-size: 3rem;
        display: grid;
        place-items: center;
        grid-template-columns: 50% 50%;
        grid-template-rows: 50% 50%;
    }

    #root button {
        position: relative;
        display: grid;
        place-items: center;
        height: 80%;
        max-height: 9rem;
        min-height: 5rem;
        aspect-ratio: 1 / 1;
        padding: 0;
        border-radius: 100%;
        outline: 1px solid black;
        border: none;
        cursor: pointer;
        background-color: white;
        grid-template-columns: minmax(0, 1fr);
    }

    #root button p:first-of-type {
        font-size: 0.9rem;
        align-self: end;
    }

    #root button p:last-of-type {
        font-size: 1.1rem;
        align-self: start;
    }

    #root button p {
        font-size: 1.3rem;
        text-transform: uppercase;
    }

    #root button.lost {
        background: rgb(250, 113, 79);
    }

    #root button.won {
        background-color: rgb(80, 194, 104);
        grid-template-rows: 30% 40% 30%;
    }

    #root button.unplayed {
        background-color: white;
    }
</style>