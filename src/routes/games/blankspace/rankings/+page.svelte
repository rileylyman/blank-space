<script lang="ts">
    import { BS_HOME_SKIP_MENU, BS_STATS } from "$lib/links";
    import { onMount, tick } from "svelte";
    import { preloadData } from "$app/navigation";

    export let data;
    let entryHeight: number;
    let rankingsElement: HTMLElement;

    onMount(() => {
        select("this", 300);
        preloadData(BS_HOME_SKIP_MENU);
    })

    const select = async (week: "this" | "last", timeout: number) => {
        selected = week;
        await tick();

        setTimeout(() => {
            rankingsElement.scrollTop = entryHeight * (viewed.idx - 2);
        }, timeout);
    }

    let day = (new Date()).getDay();
    let selected = "this";
    $: viewed = selected === "this" ? data.thisWeek : data.lastWeek;
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
        {#if viewed.idx >= 0}
            <p> #{viewed.standings[viewed.idx].rank} out of {viewed.standings.length} players</p>
        {/if}
        {#if selected === "this"}
            <p style="font-style: italic; font-size: 0.9rem">
                Play all your games to attain max rank! 
            </p>
        {/if}
    </div>
    <div class="rankings" bind:this={rankingsElement}>
        <div class="header entry" bind:clientHeight={entryHeight}>
            <span class="table-header"> # </span>
            <span class="table-header"> User </span>
            <span class="table-header score"> Played </span>
            <span class="table-header score"> Score </span>
        </div>
        {#each viewed.standings as {username, total_score, games_played, rank}, idx}
            <div class="entry" class:highlight={idx === viewed.idx}>
                <span class="rank">  
                    {rank} 
                    {#if idx > 0 && rank == viewed.standings[idx - 1].rank}
                        <div class="tied">
                            ||
                        </div>
                    {/if}
                </span>
                <span class="user"> {username} </span>
                <span class="score"> {games_played} </span>
                <span class="score"> {total_score} </span>
            </div>
        {/each}
    </div>
    <div class="buttons">
        <a href={BS_HOME_SKIP_MENU}> Back </a>
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
        grid-template-rows: 10vh 25vh 40vh 25vh;
        grid-template-rows: 10svh 25svh 40svh 25svh;
    }

    @media (width >= 50rem) {
        #root {
            border-left: 1px solid black;
            border-right: 1px solid black;
        }
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
        grid-template-columns: 10% 55% 20% 15%;
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
        place-items: center;
        grid-template-columns: 50% 50%;
        width: 80%;
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