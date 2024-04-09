<script lang="ts">
    import { BS_HOME_SKIP, BS_RANKINGS } from "$lib/links";
    import BarPlot from "$lib/ui/BarPlot.svelte";
    import { onMount } from "svelte";
    import { preloadData } from "$app/navigation";

    export let data;

    onMount(() => {
        preloadData(BS_HOME_SKIP);
        preloadData(BS_RANKINGS);
    })

    const won = data.stats.won_games ?? 0;
    const total = data.stats.total_games ?? 1;
    $: winRate = Math.round((won / total) * 100);
</script>

<div id="root">
    <h1> Your Statistics </h1>
    <p>All-Time Guess Performance</p>
    <div class="bars-container">
        <BarPlot bars={data.bars} allowTruncate={false} />
    </div>
    <div class="stats">
        <span class="left"> Total Games </span>
        <span class="right"> {data.stats.total_games} </span>
        <span class="left"> Win Rate </span>
        <span class="right"> {winRate}% </span>
        <span class="left"> Score This Week </span>
        <span class="right"> {data.thisWeekScore} </span>
        <span class="left"> Score Last Week </span>
        <span class="right"> {data.lastWeekScore} </span>
    </div>
</div>

<style>
    #root {
        background: white;
        width: 100vw;
        max-width: 50rem;
        margin: 0 auto;
        text-align: center;
    }

    p {
        margin: 1rem;
        margin-bottom: 0.5rem;
        font-style: italic;
        text-align: center;
    }

    .bars-container {
        width: 90%;
        margin: 0 auto;
    }

    .stats {
        display: grid;
        align-items: center;
        grid-template-columns: 50% 50%;
        white-space: nowrap;
        margin: 0 auto;
        column-gap: 1rem;
        margin-top: 5rem;
        font-size: 1.5rem;
        border: 1px solid black; 
        border-radius: 1rem;
        background: black;
    }

    .stats * {
        background: white;
    }

    .stats .left:first-of-type {
        border-top-left-radius: 1rem;
    }

    .stats .left:last-of-type {
        border-bottom-left-radius: 1rem;
    }

    .stats .left {
        text-align: right;
    }

    .stats .right {
        text-align: left;
    }
</style>