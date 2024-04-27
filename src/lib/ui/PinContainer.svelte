<script lang="ts">
    import { type BsGameSet, type BsGameProgress } from "$lib/schema";
    import { goto, invalidateAll } from "$app/navigation";
    import Fa from "svelte-fa";
    import { faPersonWalkingArrowLoopLeft, faPlay } from '@fortawesome/free-solid-svg-icons';

    export let progs: BsGameProgress[];
    export let set: BsGameSet;
    export let links: string[];
    export let deleteButtons: boolean;

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
            class="pin"
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
            {#if deleteButtons && prog !== undefined}
                <button on:click|stopPropagation={async () => {
                    await fetch("/api/blankspace/delete_prog?progId=" + prog?.id, { method: "POST" });
                    invalidateAll();
                }} 
                class="delete"> <span>x</span> </button>
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

    #root .pin {
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

    #root .pin p:first-of-type {
        font-size: 0.9rem;
        align-self: end;
    }

    #root .pin p:last-of-type {
        font-size: 1.1rem;
        align-self: start;
    }

    #root .pin p {
        font-size: 1.3rem;
        text-transform: uppercase;
    }

    #root .pin.lost {
        background: rgb(250, 113, 79);
    }

    #root .pin.won {
        background-color: rgb(80, 194, 104);
        grid-template-rows: 30% 40% 30%;
    }

    #root .pin.unplayed {
        background-color: white;
    }

    #root .delete {
        position: absolute;
        top: 0;
        right: 0;
        width: 2rem;
        height: 2rem;
        font-size: 1.3rem;
        background: rgb(250, 113, 79);
        display: grid;
        place-items: center;
        border: 1px solid black;
        outline: none;
        border-radius: 50%;
        z-index: 5;
    }

    .delete span {
        transform: translateY(-3px);
    }
</style>