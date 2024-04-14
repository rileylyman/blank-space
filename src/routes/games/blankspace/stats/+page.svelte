<script lang="ts">
    import { BS_HOME_SKIP_MENU, BS_RANKINGS } from "$lib/links";
    import BarPlot from "$lib/ui/BarPlot.svelte";
    import { onMount } from "svelte";
    import { preloadData } from "$app/navigation";

    export let data;

    onMount(() => {
        preloadData(BS_HOME_SKIP_MENU);
    })

    const won = data.stats?.won_games ?? 0;
    const total = data.stats?.total_games ?? 1;
    $: winRate = Math.round((won / total) * 100);
    $: avgScore = Math.round((data.stats?.avg_score ?? 0));
</script>

<div id="root">
    <h1> Your Statistics </h1>
    <div class="bars-container">
        <p class="gd-header">All-Time Guess Performance</p>
        <BarPlot bars={data.bars} allowTruncate={false} />
    </div>
    <div class="stats">
        <p>Total Games <span>{data.stats?.total_games ?? 0}</span></p>
        <p>Win Rate <span>{winRate}%</span></p>
        <p>Avg. Single Score <span>{avgScore}/25</span></p>
        <p>This Week's Score <span>{data.thisWeekScore}</span></p>
        <p>Last Week's Score <span>{data.lastWeekScore}</span></p>
    </div>
    <div class="buttons">
        <a href={BS_HOME_SKIP_MENU}> Back </a>
        <a href={BS_RANKINGS}> See Rankings </a>
    </div>
</div>

<style>
    #root {
        background: white;
        width: 100vw;
        max-width: 30rem;
        margin: 0 auto;
        text-align: center;
        display: flex;
        justify-content: space-around;
        flex-flow: column;
        height: 100vh;
        height: 100svh;
    }

    .bars-container {
        width: 90%;
        margin: 0 auto;
        margin-top: -4rem;
    }

    .gd-header {
        margin: 1rem;
        margin-bottom: 0.5rem;
        font-style: italic;
        text-align: center;
    }

    .stats {
        font-size: 1.25rem;
        margin-top: -2rem;
    }

    .stats p {
        margin-bottom: 0.5rem;
        font-style: italic;
    }

    .stats span {
        font-weight: bold;
    }

    .buttons {
        display: grid;
        place-items: center;
        grid-template-columns: 50% 50%;
        width: 80%;
        margin: 0 auto;
    }

    .buttons a {
        background: #c0c0c0;
        text-decoration: none;
        color: black;
        font-weight: 600;
        border-radius: 0.25rem;
        width: 90%; 
        padding: 0.5rem 1rem;
        white-space: nowrap;
    }
</style>