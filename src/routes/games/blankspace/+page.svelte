<script lang="ts">
    import Fa from "svelte-fa";
    import { faShareAlt, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
    import Curtain from "./Curtain.svelte";
    import { goto, preloadData } from "$app/navigation";
    import { bsGameLink } from "$lib/links";
    import { onMount, onDestroy } from "svelte";
    import { fitText } from "$lib/utils";

    export let data;

    let root: HTMLElement;
    onMount(() => {
        data.currentSet.games.forEach((_, idx) => preloadData(bsGameLink(data.currentSet.id, idx)));
        fitText(root, '.pin-container button', 0.5);
    })

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const gameDate = new Date(data.currentSet.publish_on);
    const gameDateString = `${weekdays[gameDate.getUTCDay()]}, ${months[gameDate.getUTCMonth()]} ${gameDate.getUTCDate()}`

    let folded = true;
    let foldedHeight = "25%";

    let countdown = "loading...";
    const updateCountdown = () => {
        let now = new Date();
        let nextSetAvail: Date;
        if (data.currentSet.next_set_avail) {
            nextSetAvail = new Date(data.currentSet.next_set_avail);
        } else {
            nextSetAvail = new Date(data.currentSet.publish_on);
            nextSetAvail.setDate(nextSetAvail.getDate() + 1);
        }

        let distance = nextSetAvail.getTime() - now.getTime();
        if (distance < 0) distance = 0;
        let rhr = Math.floor(Math.max((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60), 0)).toString().padStart(2, '0');
        let rmin = Math.floor(Math.max((distance % (1000 * 60 * 60)) / (1000 * 60), 0)).toString().padStart(2, '0');
        let rsec = Math.floor(Math.max((distance % (1000 * 60)) / 1000, 0)).toString().padStart(2, '0');

        countdown = `${rhr}:${rmin}:${rsec}`;
    }

    updateCountdown();
    let countdownInterval = setInterval(updateCountdown, 1000);
    onDestroy(() => clearInterval(countdownInterval));
</script>

<div id="root" bind:this={root}>
    <Curtain bind:folded {foldedHeight} />

    <div />
    <div class="game-date">
        {gameDateString}
    </div>
    <div class="pin-container">
        {#each data.setProgress as prog, idx}
            <button 
                on:click={() => goto(bsGameLink(data.currentSet.id, idx))}
                class:won={prog} 
                class:lost={prog === false} 
                class:unplayed={prog === null}>
                {#if prog === true}
                    <Fa icon={faCheck} />
                {:else if prog === false}
                    <Fa icon={faXmark} />
                {:else}
                    Tap to play
                {/if}
            </button>
        {/each}
    </div>
    <div class="guess-distro-container">
        <p> Score Today </p> <p> Score This Week</p>
        <div> {data.currentScore} </div> <div> {data.weekScore} </div>
    </div>
    <div class="stats"> 
        <p>{data.totalGames}</p><p>total games</p>
        <p>{data.winPct}%</p><p>win rate</p>
        <p>{data.streak}</p><p>streak</p>
        <p>{data.maxStreak}</p><p>max. streak</p>
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
        max-width: 50rem;
        margin: 0 auto;
        height: 100vh;
        height: 100svh;
        display: grid;
        grid-template-rows: 25% 3rem 1fr 6.5rem 5rem 4rem;
        place-items: stretch;
    }

    .stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        place-items: center;
        width: 85%;
        place-self: center;
        font-size: 1.2rem;
    }

    .stats p {
        text-align: center; 
        font-size: 1.2em;
        text-transform: uppercase;
        white-space: nowrap;
    }

    .stats p:nth-child(even) {
        grid-row: 2;
        font-size: 0.7em;
        align-self: start;
        font-weight: bold;
    }

    .stats p:nth-child(odd) {
        grid-row: 1;
        align-self: end;
    }

    .game-date {
        display: grid;
        place-items: center;
        font-size: 1.75rem;
    }

    .pin-container {
        margin: 0 auto;
        place-self: stretch;
        display: grid;
        place-items: center;
        grid-template-columns: 50% 50%;
        grid-template-rows: 50% 50%;
        overflow: hidden;
        width: 85%;
    }

    .pin-container button {
        display: grid;
        place-items: center;
        height: 80%;
        max-height: 9rem;
        min-height: 5rem;
        aspect-ratio: 1 / 1;
        padding: 0;
        border-radius: 100%;
        outline: 1px solid black;
        border: none;
    }

    .pin-container button.lost {
        background: rgb(250, 113, 79);
    }

    .pin-container button.won {
        background-color: rgb(80, 194, 104);
    }

    .pin-container button.unplayed {
        background-color: white;
    }

    .guess-distro-container {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 35% 65%;
        width: 85%;
        place-self: center;
    }

    .guess-distro-container p {
        font-size: 1.25rem;
        white-space: nowrap;
        text-align: center;
        align-self: end;
        max-height: 100%;
    }

    .guess-distro-container div {
        font-size: 4rem;
        font-weight: 600;
        align-self: start;
        margin-top: -1rem;
    }

    .footer {
        display: grid;
        place-items: center;
        align-items: end;
        grid-template-columns: 1fr 1fr;
        column-gap: 5%;
        padding-bottom: 1rem;
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