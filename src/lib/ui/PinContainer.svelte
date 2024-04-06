<script lang="ts">
    import { GameProgress } from "$lib/schema";
    import { goto } from "$app/navigation";
    import Fa from "svelte-fa";
    import { faCheck, faXmark, faPersonWalkingArrowLoopLeft, faPlay } from '@fortawesome/free-solid-svg-icons';

    export let setProgress: GameProgress[];
    export let links: string[];
</script>

<div id="root">
    {#each setProgress as prog, idx}
        <button 
            on:click={() => goto(links[idx])}
            class:won={prog === GameProgress.WON} 
            class:lost={prog === GameProgress.LOST} 
            class:some-prog={prog === GameProgress.SOME_PROGRESS} 
            class:unplayed={prog === GameProgress.NO_PROGRESS}>
            {#if prog === GameProgress.WON}
                <Fa icon={faCheck} />
            {:else if prog === GameProgress.LOST}
                <Fa icon={faXmark} />
            {:else if prog === GameProgress.SOME_PROGRESS}
                <Fa icon={faPersonWalkingArrowLoopLeft} size="0.8x" />
            {:else}
                <Fa icon={faPlay} size="0.8x" />
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
    }

    #root button.lost {
        background: rgb(250, 113, 79);
    }

    #root button.won {
        background-color: rgb(80, 194, 104);
    }

    #root button.unplayed {
        background-color: white;
    }

    #root button.some-prog {
        background-color: white;
    }
</style>