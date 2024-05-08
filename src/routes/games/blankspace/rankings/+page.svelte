<script lang="ts">
    import { BS_HOME_SKIP, BS_STATS } from "$lib/links";
    import { onMount, tick } from "svelte";
    import { preloadData } from "$app/navigation";
    import { areFlagsHardcore, setWantHomeMenu } from "$lib/utils.js";
    import Fa from "svelte-fa";
    import { faMedal, faPeace } from "@fortawesome/free-solid-svg-icons";
    import type { BsWeeklyStanding } from "$lib/schema";
    import type { Rankings } from "./common.js";

    export let data;
    let entryHeight: number;
    let rankingsElement: HTMLElement;

    onMount(() => {
        select("this", 300);
        setWantHomeMenu(true);
        rankFilter = 'none';
        preloadData(BS_HOME_SKIP);
    })

    const select = async (week: "this" | "last", timeout: number) => {
        selected = week;
        await tick();

        setTimeout(() => {
            rankingsElement.scrollTop = entryHeight * (viewed.idxCurr - 2);
        }, timeout);
    }

    const trimLong = (s: string): string => {
        if (s.length > 14) return `${s.slice(0, 14)}...`;
        else return s;
    }

    type RankFilter = 'none' | 'pf' | 'hc';
    let rankFilter: RankFilter = 'none';

    const chooseRank = (rank: number | undefined, rankPf: number | undefined, rankHc: number | undefined, filter: RankFilter): number | undefined => {
        if (filter === 'none') return rank;
        else if (filter === 'pf') return rankPf;
        else return rankHc;
    }

    const getCurrent = (rankings: Rankings, filter: RankFilter): { standingsCurr: Array<BsWeeklyStanding>, idxCurr: number, score: number } => {
        if (filter === 'none') return { score: rankings.score, idxCurr: rankings.idx, standingsCurr: rankings.standings };
        else if (filter === 'pf') return { score: rankings.score, idxCurr: rankings.idxPf, standingsCurr: rankings.standingsPf };
        else return { score: rankings.score, idxCurr: rankings.idxHc, standingsCurr: rankings.standingsHc };
    }
    const filterClicked = async (filter: RankFilter) => {
        rankFilter = filter;
        await select(selected, 250);
    }

    let day = (new Date()).getDay();
    let selected: 'this' | 'last' = "this";
    $: viewed = selected === "this" ? getCurrent(data.thisWeek, rankFilter) : getCurrent(data.lastWeek, rankFilter);
</script>

<div id="root">
    <div 
        class="tab-container"
        class:last-week={selected === "last"}
        class:this-week={selected === "this"}
    >
        <button
            class="tab"
            class:selected={selected === "last"}
            on:click={() => select("last", 500)}
        > 
            Last Week 
        </button>
        <button
            class="tab"
            class:selected={selected === "this"}
            on:click={() => select("this", 500)}
        > 
            This Week
        </button>
    </div>
    <div class="header">
        <p style="font-size: 1.2rem; font-weight: 500">
            {#if selected === "this"}
                Score Through Day {day + 1}
            {:else}
                Last Week's Score
            {/if}
        </p>
        <h1>{viewed.score}</h1>
        {#if viewed.idxCurr >= 0}
            <p> #{viewed.standingsCurr[viewed.idxCurr].rank} out of {viewed.standingsCurr.length} players</p>
        {/if}
        {#if selected === "this"}
            <p style="font-style: italic; font-size: 0.9rem">
                Play all your games to attain max rank! 
            </p>
        {/if}
    </div>
    <p class="badge-explainer"> 
        {#if data.features.badges}
            <div>
                <Fa icon={faMedal} /> <span> = hardcore mode</span>
            </div>
            <div>
                <Fa icon={faPeace} /> <span> = peaceful mode</span>
            </div>
        {/if}
    </p>
    <div class="rankings" bind:this={rankingsElement}>
        <div class="header entry" bind:clientHeight={entryHeight}>
            <span class="table-header"> # </span>
            <span> </span>
            <span class="table-header"> User </span>
            <span class="table-header score"> Played </span>
            <span class="table-header score"> Score </span>
        </div>
        {#each viewed.standingsCurr as {username, total_score, games_played, rank, rankPf, rankHc, flags}, idx}
            <div class="entry" class:highlight={idx === viewed.idxCurr}>
                <span class="rank">  
                    {chooseRank(rank, rankPf, rankHc, rankFilter)} 
                    {#if idx > 0 && rank == viewed.standingsCurr[idx - 1].rank}
                        <div class="tied">
                            ||
                        </div>
                    {/if}
                </span>
                <span>
                    {#if data.features.badges && flags === 0}
                        <Fa size="0.85x" icon={faMedal} />
                    {:else if data.features.badges}
                        <Fa size="0.85x" icon={faPeace} />
                    {/if}
                </span>
                <span class="user"> {trimLong(username)} </span>
                <span class="score"> {games_played} </span>
                <span class="score"> {total_score} </span>
            </div>
        {/each}
    </div>
    <div class="filter-select"> 
        <button class:selected={rankFilter === 'none'} on:click={() => filterClicked('none')}> Show Everyone </button>
        <button class:selected={rankFilter === 'pf'} on:click={() => filterClicked('pf')}> Peaceful Only </button>
        <button class:selected={rankFilter === 'hc'} on:click={() => filterClicked('hc')}> Hardcore Only </button>
    </div>
    <div class="buttons">
        <a href={BS_HOME_SKIP}> Back </a>
        <a href={BS_STATS}> See Stats </a>
    </div>
</div>

<style>
    :root {
        scroll-behavior: smooth;
    }

    #root {
        background: white;
        width: 100vw;
        max-width: 50rem;
        margin: 0 auto;
        display: grid;
        place-items: center;
        grid-template-rows: 10vh 20vh 7.5vh 40vh 5vh 17.5vh;
        grid-template-rows: 10svh 20svh 7.5vh 40svh 5svh 17.5svh;
    }

    @media (width >= 50rem) {
        #root {
            border-left: 1px solid black;
            border-right: 1px solid black;
        }
    }

    .filter-select {
        height: 100%;
        width: 100%;
        display: grid;
        place-items: center;
        grid-template-columns: 33% 33% 33%;
    }

    .filter-select button {
        white-space: nowrap;
        overflow: hidden;
        font-size: 0.7rem;
        height: 75%;
        width: 80%;
        outline: none;
        border: none;
        background: #e0e0e0;
        border-radius: 0.25rem;
    }

    .filter-select button.selected {
        background: #202020;
        color: white;
    }

    .badge-explainer {
        height: 100%;
        text-align: center;
        font-size: 0.8rem;
        font-style: italic;
        width: 100%;
        max-width: 25rem;
        display: grid;
        place-items: center;
        padding: 0 2rem;
        grid-template-columns: 50% 50%;
    }

    .badge-explainer div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .badge-explainer div span {
        margin-left: 0.5rem;
    }

    .tab-container {
        display: grid;
        place-items: stretch;
        grid-template-columns: 50% 50%;
        width: 100%;
        height: 100%;
        transition: grid-template-columns 500ms;
    }

    .tab-container.last-week {
        grid-template-columns: 65% 35%;
    }

    .tab-container.this-week {
        grid-template-columns: 35% 65%;
    }

    .tab-container .tab {
        background: #eee;
        outline: none;
        border: none;
        border-bottom: 1px solid black;
        color: #666;
        font-size: 0.9rem;
    }

    .tab-container .tab.selected {
        background: white;
        border-bottom: none;
        font-weight: 600;
        font-size: 1.5rem;
        color: black;
        white-space: nowrap;
    }

    .tab-container .tab.selected:first-of-type {
        border-right: 1px solid black;
    }

    .tab-container .tab.selected:last-of-type {
        border-left: 1px solid black;
    }

    .header {
        display: grid;
        place-items: center;
        align-self: start;
        padding-top: 0.5rem;
    }

    .rankings {
        width: calc(100% - 4rem);
        margin: 0 2rem;
        height: 100%;
        border: 1px solid black;
        border-radius: 0.5rem;
        overflow-y: auto;
        scroll-behavior: smooth;
        overscroll-behavior: contain;
    }

    @media (width < 50rem) {
        .rankings {
            border-left: none;
            border-right: none;
            border-radius: 0;
            width: 100%;
            margin: 0;
        }
    }

    .rankings .entry {
        display: grid;
        justify-items: start;
        align-items: center;
        grid-template-columns: 10% 10% 45% 20% 15%;
        padding: 0.5rem 1rem;
    }

    .rankings .entry.header {
        position: sticky; 
        top: 0; 
        background: white; 
        z-index: 2;
    }

    .entry .rank {
        position: relative;
    }

    .entry .rank .tied {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateY(-100%) translateX(-50%);
        font-size: 0.65rem;
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

    .buttons {
        display: grid;
        align-items: center;
        justify-items: center;
        grid-template-columns: 50% 50%;
        width: 80%;
        height: 100%;
        margin: 0 auto;
        text-align: center;
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