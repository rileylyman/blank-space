<script lang="ts">
    import { type DayProgress } from './common';

    export let dps: DayProgress[];

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
</script>

<div id="root">
    {#each dps as { played }, idx}
        <div class="day">
            <p> {days[idx]} </p>
            <div class:none={played === 0} class:some={played > 0} class:all={played === 4}>
                <a> {played}/4 <a> 
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

    .day div a {
        color: black;
        text-decoration: none;
    }

    .day p {
        font-weight: 600;
        text-transform: uppercase;
        font-size: 1.1rem;
    }
</style>