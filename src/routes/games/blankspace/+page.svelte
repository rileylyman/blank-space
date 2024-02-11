<script lang="ts">
    import Fa from "svelte-fa";
    import { faShareAlt, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
    import Curtain from "./Curtain.svelte";
    import BarPlot from "$lib/ui/BarPlot.svelte";
    import { GameStatus } from './common';
    import { goto, preloadData } from "$app/navigation";
    import { BS_GAME_LIST, BS_HOME, BS_HOME_SKIP, bsGameLink } from "$lib/links";
    import { onDestroy } from "svelte";
    import { browser } from "$app/environment";

    export let data;

    $: gamesRemaining = data.gameResults.filter((res) => res === GameStatus.Unplayed || res === GameStatus.InProgress).length;
    $: nextGameIndex = data.gameResults.findIndex((res) => res === GameStatus.Unplayed || res === GameStatus.InProgress)
    let nextGameId = "";
    $: {
        if (nextGameIndex >= 0) {
            nextGameId = data.todaySet.games[nextGameIndex];
            if (browser) {
                console.log("preloading data");
                preloadData(bsGameLink(nextGameId, BS_HOME_SKIP));
            }
        }
    }

    let gameDate = new Date(data.todaySet.publish_on);
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let gameDateString = `${weekdays[gameDate.getUTCDay()]}, ${months[gameDate.getUTCMonth()]} ${gameDate.getUTCDate()}`


    let folded = true;
    let foldedHeight = "25%";

    let countdown = "00:00:00";
    const updateCountdown = () => {
        let now = new Date();

        let distance = data.nextDate.getTime() - now.getTime();
        let rhr = Math.floor(Math.max((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60), 0)).toString().padStart(2, '0');
        let rmin = Math.floor(Math.max((distance % (1000 * 60 * 60)) / (1000 * 60), 0)).toString().padStart(2, '0');
        let rsec = Math.floor(Math.max((distance % (1000 * 60)) / 1000, 0)).toString().padStart(2, '0');

        countdown = `${rhr}:${rmin}:${rsec}`;
    }

    updateCountdown();
    let countdownInterval = setInterval(updateCountdown, 1000);
    onDestroy(() => clearInterval(countdownInterval));
</script>

<div id="root">
    <Curtain bind:folded {foldedHeight} />

    <div />
    <div class="guess-distro-container">
        <h2> Overall Guess Performance</h2>
        <div>
            <BarPlot bars={data.scoreCounts} allowTruncate={false} />
        </div>
    </div>
    <div class="stats"> 
        <p>{data.totalGames}</p><p>total games</p>
        <p>{data.winPct}%</p><p>win rate</p>
        <p>0</p><p>streak</p>
        <p>15</p><p>max. streak</p>
    </div>
    <div class="game-date">
        {gameDateString}
    </div>
    <div class="pin-container">
        {#each data.gameResults as res}
            <div class:won={res === GameStatus.Won} class:unplayed={res === GameStatus.Unplayed || res === GameStatus.InProgress}>
                {#if res === GameStatus.Won}
                    <Fa icon={faCheck} />
                {:else if res === GameStatus.Lost}
                    <Fa icon={faXmark} />
                {:else if res === GameStatus.InProgress}
                    ~
                {/if}
            </div>
        {/each}
    </div>
    <div class="play-container">
        <button 
            on:click={() => {
                if (nextGameId) goto(bsGameLink(nextGameId, BS_HOME_SKIP))
            }}
        >
            Play
            <span> {gamesRemaining} game{gamesRemaining !== 1 ? 's' : ''} remaining </span>
        </button>
    </div>
    <div class="footer">
        <button>
            {countdown}
            <span> next set </span>
        </button>
        <button>
            <Fa icon={faShareAlt} />
            <span> share </span>
        </button>
    </div>
</div>

<style>
    #root {
        background: white;
        width: 100vw;
        height: 100vh;
        height: 100svh;
        display: grid;
        grid-template-rows: 25% 2fr 1.25fr 1fr 0.6fr 2fr 1.25fr;
        place-items: stretch;
    }

    .stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        place-items: center;
        padding-bottom: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .stats p {
        text-align: center; 
        font-size: 1.2rem;
        text-transform: uppercase;
    }

    .stats p:nth-child(even) {
        grid-row: 2;
        font-size: 0.7rem;
        align-self: start;
        font-weight: bold;
    }

    .stats p:nth-child(odd) {
        grid-row: 1;
        align-self: end;
    }

    .play-container {
        display: grid;
        place-items: center;
        align-self: end;
        padding-bottom: 1rem;
    }

    .play-container button {
        border: none;
        outline: none;
        background: rgb(234, 234, 234);
        border: 1px solid black;
        font-size: 2rem;
        border-radius: 0.25rem;
        padding: 0.5rem 5rem;
        width: 81%;
        text-transform: uppercase;
        display: grid;
        place-items: center;
        grid-template-rows: 75% 25%;
    }

    .play-container button span {
        font-size: 0.8rem;
        text-transform: lowercase;
        font-style: italic;
    }

    .game-date {
        display: grid;
        place-items: center;
        font-size: 1.5rem;
    }

    .pin-container {
        place-self: center;
        width: 81%;
        padding: 0.5rem;
        border-radius: 0.25rem;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-self: end; 
        place-items: center;
    }

    .pin-container div {
        display: grid;
        place-items: center;
        background: rgb(250, 113, 79);
        width: 1.5rem;
        height: 1.5rem;
        padding: 0;
        border-radius: 100%;
        font-size: 0.75rem;
        outline: 1px solid black;
    }

    .pin-container div.won {
        background-color: rgb(80, 194, 104);
    }

    .pin-container div.unplayed {
        background-color: white;
        outline: 1px solid black;
    }

    .guess-distro-container {
        display: grid;
        place-items: center;
        padding-top: 1rem;
        padding-bottom: 0.5rem;
    }

    .guess-distro-container > h2 {
        text-transform: uppercase;
        font-weight: 400;
        font-size: 1rem;
        font-style: italic;
        padding-bottom: 0.5rem;
    }

    .guess-distro-container > div {
        width: 81%;
    }

    .footer {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 1fr;
        column-gap: 5%;
        align-items: start;
    }

    .footer button {
        background: rgb(234, 234, 234);
        outline: none;
        border: 1px solid black;
        border-radius: 0.25rem;
        width: 80%;
        height: 2.75rem;
        padding: 0;
        font-size: 1.5rem;
        display: grid;
        place-items: center;
        grid-template-rows: 75% 25%;
        padding-bottom: 0.25rem;
        justify-self: end;
    }

    .footer button:last-child {
        justify-self: start;
    }

    .footer button span {
        font-size: 0.8rem;
        font-style: italic;
    }
</style>