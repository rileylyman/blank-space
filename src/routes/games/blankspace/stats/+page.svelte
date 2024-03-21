<script lang="ts">
    import { BS_HOME_SKIP } from "$lib/links";
    import BarPlot from "$lib/ui/BarPlot.svelte";
    import { onMount } from "svelte";

    export let data;
    let entryHeight: number;
    let rankingsElement: HTMLElement;

    onMount(() => {
        setTimeout(() => {
            rankingsElement.scrollTop = entryHeight * (data.yourStandingIdx - 2);
        }, 500);
    })
</script>

<div id="root">
    <div class="header">
        <p> Score this week</p>
        <h1>{data.yourWeekScore}</h1>
        {#if data.yourStandingIdx > 0}
            <p> #{data.yourStandingIdx + 1} out of {data.rankings.length} players</p>
        {/if}
    </div>
    <div class="rankings" bind:this={rankingsElement}>
        <div style="position: sticky; top: 0; background: white;" class="entry" bind:clientHeight={entryHeight}>
            <span class="table-header"> # </span>
            <span class="table-header"> User </span>
            <span class="table-header"> Score </span>
        </div>
        {#each data.rankings as {user, score}, idx}
            <div class="entry" class:highlight={idx === data.yourStandingIdx}>
                <span class="rank">  {idx + 1} </span>
                <span class="user"> {user} </span>
                <span class="score"> {score} </span>
            </div>
        {/each}
    </div>
    <div class="bars">
        <p>Your All-Time Guess Performance</p>
        <div class="bars-container">
            <BarPlot bars={data.bars} allowTruncate={false} />
        </div>
    </div>
    <div class="buttons">
        <a href={BS_HOME_SKIP}> Go Home </a>
    </div>
</div>

<style>
    #root {
        background: white;
        width: 100vw;
        max-width: 50rem;
        margin: 0 auto;
        height: 100vh;
        height: 100svh;
        display: grid;
        place-items: center;
        padding-top: 1rem;
        grid-template-rows: 20% 40% 30% 10%;
    }

    .header {
        display: grid;
        place-items: center;
    }

    .rankings {
        width: 100%;
        height: 100%;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        overflow-y: auto;
        scroll-behavior: smooth;
    }

    .rankings .entry {
        display: grid;
        justify-items: start;
        align-items: center;
        grid-template-columns: 10% 80% 10%;
        padding: 0.5rem 1rem;
    }

    .entry .user {
        font-weight: bold;
    }

    .entry .table-header { 
        font-weight: bold;
    }

    .entry.highlight {
        background-color: rgb(251, 240, 124);
    }

    .bars {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .bars p {
        margin: 1rem;
        margin-bottom: 0.5rem;
        font-style: italic;
    }

    .bars-container {
        width: 90%;
    }

    .buttons {
        width: 100%;
        display: grid;
        place-items: center;
    }

    .buttons a {
        margin: 0 auto;
        outline: none;
        border: none;
        padding: 0.5rem 1rem;
        font-size: 1.25rem;
        background: #c0c0c0;
        border-radius: 0.25rem;
        color: black;
        text-decoration: none;
    }
</style>