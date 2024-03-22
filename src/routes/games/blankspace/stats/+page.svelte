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

    let today = new Date();
    let day = today.getDay();
    let sunday = new Date();
    let nextSunday = new Date();
    sunday.setDate(today.getDate() - day);
    nextSunday.setDate(today.getDate() + (7 - day)); 
</script>

<div id="root">
    <div class="header">
        <p style="font-style: italic; font-size: 0.9rem"> Week of {sunday.getMonth() + 1}/{sunday.getDate()} - {nextSunday.getMonth() + 1}/{nextSunday.getDate()}</p>
        <p> Score Through Day {day + 1} </p>
        <h1>{data.yourWeekScore}</h1>
        {#if data.yourStandingIdx >= 0}
            <p> #{data.yourStandingIdx + 1} out of {data.standings.length} players</p>
        {/if}
        <p style="font-style: italic; font-size: 0.9rem"> Play all your games to attain max rank! </p>
    </div>
    <div class="rankings" bind:this={rankingsElement}>
        <div style="position: sticky; top: 0; background: white;" class="entry" bind:clientHeight={entryHeight}>
            <span class="table-header"> # </span>
            <span class="table-header"> User </span>
            <span class="table-header score"> Played </span>
            <span class="table-header score"> Score </span>
        </div>
        {#each data.standings as {username, total_score, games_played}, idx}
            <div class="entry" class:highlight={idx === data.yourStandingIdx}>
                <span class="rank">  {idx + 1} </span>
                <span class="user"> {username} </span>
                <span class="score"> {games_played} </span>
                <span class="score"> {total_score} </span>
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
        grid-template-rows: 25% 35% 30% 10%;
    }

    .header {
        display: grid;
        place-items: center;
    }

    .rankings {
        width: 100%;
        height: 100%;
        border: 1px solid black;
        border-radius: 0.5rem;
        overflow-y: auto;
        scroll-behavior: smooth;
    }

    @media (width < 50rem) {
        .rankings {
            border-left: none;
            border-right: none;
            border-radius: 0;
        }
    }

    .rankings .entry {
        display: grid;
        justify-items: start;
        align-items: center;
        grid-template-columns: 10% 55% 20% 15%;
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

    .entry .score {
        text-align: center;
        width: 100%;
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