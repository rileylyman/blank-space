<script lang="ts">
    import { BS_HOME_SKIP } from "$lib/links";
import WeekContainer from "./WeekContainer.svelte";

    export let data;
</script>

<div id="root">
    <div>
        <h1> Previous Games </h1>
        <p> Revisit games from the last two weeks and finish any you might have missed.</p>
    </div>
    <div class="week">
        <h2> 
            This Week's Games
        </h2>
        <p>
            Play all your games for the best score!
        </p>
        <div class="week-container">
            <WeekContainer dps={data.thisDp} />
        </div>
    </div>
    <div class="week">
        <h2> 
            Last Week's Games
        </h2>
        <p>
            Last week's score is final, finish games for fun.
        </p>
        <div class="week-container">
            <WeekContainer dps={data.lastDp} />
        </div>
    </div>
    <div class="buttons">
        <a href={BS_HOME_SKIP}> Go Home </a>
    </div>
</div>

<style>
    #root {
        width: calc(min(100vw, 50rem));
        margin: 0 auto;
        height: 100vh;
        height: 100svh;
        background: white;
        display: grid;
        grid-template-rows: 20% 35% 30% 15%;
        place-items: center;
        text-align: center;
        padding: 0 1rem;
    }

    .week {
        width: 100%;
    }

    .week:last-of-type {
        align-self: start;
    }

    .week-container { 
        margin-top: 1rem;
        font-size: 1.2rem;
    }

    p {
        font-style: italic;
    }

    .buttons a {
        text-decoration: none;
        color: black;
        font-weight: 500;
        background: #c0c0c0;
        padding: 0.75rem 1rem;
        border-radius: 0.25rem;
        font-size: 1.2rem;
    }
</style>