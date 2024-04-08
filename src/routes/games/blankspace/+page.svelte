<script lang="ts">
    import Curtain from "./Curtain.svelte";
    import { preloadData } from "$app/navigation";
    import { BS_HOME_SKIP, BS_PREV, BS_STATS, bsGameLink } from "$lib/links";
    import { onMount } from "svelte";
    import PinContainer from "$lib/ui/PinContainer.svelte";

    export let data;

    onMount(() => {
        data.currentSet.games.forEach((_, idx) => preloadData(bsGameLink(data.currentSet.id, idx, BS_HOME_SKIP)));
        updateCountdown();
        let countdownInterval = setInterval(updateCountdown, 1000);
        return () => clearInterval(countdownInterval);
    })

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const gameDate = new Date(data.currentSet.publish_on.split(' ')[0] + ' 00:00:00Z');
    const gameDateString = `${weekdays[gameDate.getUTCDay()]}, Day ${gameDate.getUTCDay() + 1}`;

    let folded = true;
    let foldedHeight = "25%";

    let countdown = "loading...";
    const updateCountdown = () => {
        let now = new Date();
        let nextSetAvail: Date;
        if (data.currentSet.next_set_avail) {
            nextSetAvail = new Date(data.currentSet.next_set_avail.split(' ')[0] + 'T00:00:00-0700');
        } else {
            nextSetAvail = now;
        }

        let distance = nextSetAvail.getTime() - now.getTime();
        if (distance < 0) distance = 0;
        let rhr = Math.floor(Math.max((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60), 0));
        let rmin = Math.floor(Math.max((distance % (1000 * 60 * 60)) / (1000 * 60), 0));
        let rsec = Math.floor(Math.max((distance % (1000 * 60)) / 1000, 0));

        countdown = `${rhr > 0 ? rhr + "h " : ""}${rmin > 0 ? + rmin + "m " : ""}${rsec + "s"}`;
    }

</script>

<div id="root">
    <Curtain bind:folded {foldedHeight} />

    <div />
    <div class="game-date">
        {gameDateString}
    </div>
    <div class="countdown">
        next set in {countdown}
    </div>
    <div class="pin-container">
        <PinContainer links={[0, 1, 2, 3].map((n) => bsGameLink(data.currentSet.id, n, BS_HOME_SKIP))} setProgress={data.setProgress} />
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
        <a class:unseen={true} href={BS_PREV}>
            Play Past Games
            <div class="noti"> ! </div>
        </a>
        <a class:unseen={false} href={BS_STATS}>
            See Rankings
            <!-- <div class="noti"> ! </div> -->
        </a>
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
        grid-template-rows: 25% 3rem 1rem 1fr 6.5rem 5rem 4rem;
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

    .countdown {
        text-align: center;
        align-self: end;
        font-style: italic;
    }

    .pin-container {
        width: 85%;
        height: 100%;
        place-self: center;
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

    .footer a {
        background: rgb(234, 234, 234);
        outline: none;
        border: 1px solid black;
        border-radius: 0.25rem;
        width: 80%;
        height: 2.75rem;
        padding: 0;
        font-size: 1.5rem;
        justify-self: end;
        color: black;
        text-decoration: none;
        justify-self: end;
    }

    .footer a {
        font-size: 1rem;
        white-space: nowrap;
        display: grid;
        place-items: center;
        position: relative;
    }

    .footer a:last-of-type {
        justify-self: start;
    }

    .footer a.unseen {
        background-color: rgb(246, 235, 115);
    }

    .footer a .noti {
        display: none;
    }

    .footer a.unseen .noti {
        display: block;
        border-radius: 100%;
        width: 1.3rem;
        height: 1.3rem;
        background-color: rgb(252, 67, 21);
        color: white;
        position: absolute;
        top: 0;
        right: 0;
        transform: translateX(50%) translateY(-50%);
        display: grid;
        place-items: center;
    }
</style>