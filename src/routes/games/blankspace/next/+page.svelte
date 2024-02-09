<script lang="ts">
    import Fa from "svelte-fa";
    import { faShareAlt, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
    import Curtain from "./Curtain.svelte";
    import BarPlot from "$lib/ui/BarPlot.svelte";
    import { goto } from "$app/navigation";
    import { BS_GAME_LIST } from "$lib/links";
    import { onDestroy } from "svelte";

    let folded = true;
    let foldedHeight = "25%";

    let bars = new Map(Object.entries({"1st": 1, "2nd": 2, "3rd": 3, "4th": 2, "5th": 1, "lost": 3}));

    let countdown = "00:00:00";
    const updateCountdown = () => {
        let now = new Date();
        let tomorrow = new Date();
        tomorrow.setHours(0);
        tomorrow.setMinutes(0);
        tomorrow.setSeconds(0);
        tomorrow.setDate(tomorrow.getDate() + 1);

        let distance = tomorrow.getTime() - now.getTime();
        let rhr = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        let rmin = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        let rsec = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');

        countdown = `${rhr}:${rmin}:${rsec}`;

    }
    updateCountdown();
    let countdownInterval = setInterval(updateCountdown, 1000);
    onDestroy(() => clearInterval(countdownInterval));
</script>

<div id="root">
    <Curtain bind:folded {foldedHeight} />

    <div />
    <div class="stats"> 
        <p>125</p><p>total games</p>
        <p>60%</p><p>win rate</p>
        <p>0</p><p>streak</p>
        <p>15</p><p>max. streak</p>
    </div>
    <div class="play-container">
        <button on:click={() => goto(BS_GAME_LIST)}>
            Play
            <span> 1 game remaining </span>
        </button>
    </div>
    <div class="pin-container">
        {#each [true, false, true, null] as won}
            <div class:won={won === true} class:unplayed={won === null}>
                {#if won === true}
                    <Fa icon={faCheck} />
                {:else if won === false}
                    <Fa icon={faXmark} />
                {/if}
            </div>
        {/each}
    </div>
    <div class="guess-distro-container">
        <h2> Guess Distribution </h2>
        <div>
            <BarPlot {bars} allowTruncate={false} />
        </div>
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
        grid-template-rows: 25% 1.25fr 2fr 1fr 2fr 1.5fr;
        place-items: stretch;
    }

    .stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 2fr 1fr;
        place-items: center;
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

    .pin-container {
        place-self: center;
        width: 50%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-self: start; 
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
    }

    .guess-distro-container > h2 {
        text-transform: uppercase;
        font-weight: 400;
        font-size: 1rem;
        font-style: italic;
        padding-bottom: 0.5rem;
    }

    .guess-distro-container > div {
        width: 85%;
    }

    .footer {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 1fr;
        column-gap: 1rem;
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