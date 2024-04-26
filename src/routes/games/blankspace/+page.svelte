<script lang="ts">
    import Curtain from "./Curtain.svelte";
    import { preloadData } from "$app/navigation";
    import { ACCOUNT, BS_HOME_SKIP, BS_RULES, BS_PREV, BS_RANKINGS, BS_STATS, bsGameLink, ANNOUNCEMENTS, announcementLink } from "$lib/links";
    import { onMount } from "svelte";
    import PinContainer from "$lib/ui/PinContainer.svelte";
    import type { Announcement } from "$lib/schema";
    import { getWantHomeMenu, setWantHomeMenu, sleepMs } from "$lib/utils";

    export let data;

    onMount(() => {
        preloadData(BS_RANKINGS);

        if (getWantHomeMenu()) {
            setWantHomeMenu(false);
            menuActive = true;
        }

        data.newAnnouncement.then((newAnn) => {
            newAnnouncement = newAnn;
        });

        updateCountdown();
        let countdownInterval = setInterval(updateCountdown, 1000);
        return () => clearInterval(countdownInterval);
    })

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const gameDate = new Date(data.currentSet.publish_on.split(' ')[0] + ' 00:00:00Z');
    const gameDateString = `${weekdays[gameDate.getUTCDay()]}, Day ${gameDate.getUTCDay() + 1}`;

    let menuActive = false;
    let newAnnouncement: Announcement | null = null;
    let folded = true;
    let foldedHeight = "15%";

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
        <PinContainer set={data.currentSet} progs={data.progs} links={[0, 1, 2, 3].map((n) => bsGameLink(data.currentSet.id, n, BS_HOME_SKIP))} />
    </div>
    <div class="guess-distro-container">
        <p> Score Today </p> <p> Score This Week</p>
        <div> {data.currentScore} </div> <div> {data.weekScore} </div>
    </div>
    <div class="footer">
        <button class="button unseen" on:click={() => menuActive = true}>
            Rankings/Settings
            <div class="noti"> ! </div>
        </button>
    </div>

    <div id="modal" class:shown={menuActive}>
        <h1> MENU </h1>

        <a class="button" class:unseen={false} href={BS_PREV}>
            Play Past Games
            <!-- <div class="noti"> ! </div> -->
        </a>
        <a class="button" class:unseen={false} href={BS_RANKINGS}>
            Rankings
            <!-- <div class="noti"> ! </div> -->
        </a>
        <a class="button" class:unseen={false} href={BS_STATS}>
            Your Stats
            <!-- <div class="noti"> ! </div> -->
        </a>
        <a class="button" class:unseen={false} href={ACCOUNT}>
            Account Settings
        </a>
        <a class="button" class:unseen={false} href={BS_RULES}>
            How to Play
            <!-- <div class="noti"> ! </div> -->
        </a>
        <a class="button" class:unseen={false} href={ANNOUNCEMENTS}>
            Announcements
            <!-- <div class="noti"> ! </div> -->
        </a>
        <button class="button" on:click={() => menuActive = false}> Back </button>
    </div>

    <div id="announcement" class:hidden={!newAnnouncement}>
        <h2>{newAnnouncement?.title}</h2>
        <div class="preview">
            <p> A new announcement has been posted and is now available to read.
            </p>
        </div>
        <div class="buttons">
            <button on:click={() => {
                fetch(announcementLink(newAnnouncement?.id ?? "."));
                newAnnouncement = null;
            }}> Dismiss </button>
            <a href={announcementLink(newAnnouncement?.id ?? ".")}> View </a>
        </div>
    </div>
</div>

<style>
    #root {
        background: white;
        width: 100vw;
        max-width: 30rem;
        margin: 0 auto;
        height: 100vh;
        height: 100svh;
        display: grid;
        grid-template-rows: 15% 3rem 1rem 1fr 6.5rem 4rem;
        place-items: stretch;
        position: relative;
        overflow: hidden;
    }

    #announcement {
        width: 95%;
        height: 35%;
        background: #f0f0f0;
        z-index: 20;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        border: 1px solid black;
        border-radius: 1rem;
        display: grid;
        place-items: center;
        align-items: start;
        padding-top: 1rem;
        transition: transform 500ms;
    }

    #announcement.hidden {
        transform: translateY(100vh) translateX(-50%);
    }

    #announcement .preview p {
        padding: 1.5rem;
        text-align: center;
    }

    #announcement .buttons {
        width: 100%;
        display: grid;
        grid-template-columns: 50% 50%;
        place-items: center;
        align-self: end;
        padding-bottom: 1rem;
    }

    #announcement .buttons * {
        background: #c0c0c0;
        border: none;
        outline: none;
        width: 80%;
        display: grid;
        place-items: center;
        color: black;
        font-weight: 500;
        text-decoration: none;
        border-radius: 0.25rem;
        font-size: 1.1rem;
        padding: 0.25rem;
    }

    #modal {
        position: absolute;
        height: 85%;
        width: 100%;
        top: 15%;
        left: 0;
        transform: translateX(100vw);
        background: white;
        z-index: 2;
        transition: transform 300ms;
        display: flex;
        flex-flow: column;
        align-items: center;
        padding-bottom: 10%;
        padding-top: 10%;
    }

    #modal.shown {
        transform: none;
    }

    #modal h1 {
        margin-bottom: auto;
        font-size: 3rem;
        font-weight: 600;
    }

    #modal .button {
        margin-bottom: 1rem;
        font-size: 1.25rem;
        height: min-content;
        padding: 0.2rem;
    }

    #modal .button:last-child {
        margin-top: auto;
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
        padding-bottom: 1rem;
    }

    .button {
        background: #c0c0c0;
        outline: none;
        border: none;
        border-radius: 0.25rem;
        width: 75%;
        max-width: 25rem;
        height: 2.75rem;
        padding: 0;
        font-size: 1.5rem;
        font-weight: 400;
        color: black;
        text-decoration: none;
        white-space: nowrap;
        display: grid;
        place-items: center;
        position: relative;
    }

    .button.unseen {
        background-color: rgb(246, 235, 115);
        border: 1px solid black;
    }

    .button .noti {
        display: none;
        font-size: 1rem;
    }

    .button.unseen .noti {
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