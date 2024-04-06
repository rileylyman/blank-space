<script lang="ts">
    import { type DayProgress } from './common';
    import { createEventDispatcher } from 'svelte';

    export let dps: DayProgress[];

    const dispatch = createEventDispatcher();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
</script>

<div id="root">
    {#each dps as { played }, idx}
        <div class="day">
            <p> {days[idx]} </p>
            <div class:none={played === 0} class:some={played > 0} class:all={played === 4}>
                <button on:click={() => dispatch("clicked", { idx, prog: dps[idx] })}>{played}/4<button> 
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

    .day div.none {
        background: white;
    }

    .day div.some {
        background: linear-gradient(-90deg, white 50%, white 50%, rgb(80, 194, 104) 50%, rgb(80, 194, 104) 100%);
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
    }

    .day p {
        font-weight: 600;
        text-transform: uppercase;
        font-size: 1.1rem;
    }
</style>