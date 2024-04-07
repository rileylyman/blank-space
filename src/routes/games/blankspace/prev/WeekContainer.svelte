<script lang="ts">
    import { type DayProgress } from './common';
    import { createEventDispatcher } from 'svelte';

    export let dps: DayProgress[];
    for (let i = 0; i < 7; i++) {
        if (i >= dps.length) {
            dps.push({ set: { id: "", publish_on: "", games: [] }, played: -1, gameProgs: []}) 
        }
    }

    const dispatch = createEventDispatcher();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
</script>

<div id="root">
    {#each dps as { played }, idx}
        <div class="day">
            <p> {days[idx]} </p>
            <div class:future={played === -1} class:none={played === 0} class:some={played > 0} class:all={played === 4}>
                {#if played >= 0}
                    <button on:click={() => dispatch("clicked", { idx, prog: dps[idx] })}>{played}/4</button> 
                {:else}
                    ?/?
                {/if}
            </div> 
        </div>
    {/each}
</div>

<style>
    #root {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }

    .day div {
        border: 1px solid black;
        aspect-ratio: 1 / 1;
        display: grid;
        place-items: center;
        margin: 0.1rem;
    }

    .day div.future {
        background: #c0c0c0;
    }

    .day div.none {
        background: white;
    }

    .day div.some {
        background: linear-gradient(-90deg, white 0%, white 50%, rgb(80, 194, 104) 50%, rgb(80, 194, 104) 100%);
    }

    .day div.all {
        background: rgb(80, 194, 104);
    }

    .day div button {
        color: black;
        text-decoration: none;
        border: none;
        background: none;
        padding: 0;
        display: inline;
        width: 100%;
        height: 100%;
        cursor:pointer;
    }

    .day p {
        font-weight: 600;
        text-transform: uppercase;
        font-size: 1.1rem;
    }
</style>