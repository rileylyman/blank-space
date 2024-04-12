<script lang="ts">
    import { BS_HOME_SKIP_MENU, BS_PREV, bsGameLink } from "$lib/links";
    import PinContainer from "$lib/ui/PinContainer.svelte";
    import { onMount } from "svelte";
    import WeekContainer from "./WeekContainer.svelte";
    import { preloadData} from "$app/navigation";
    import { browser } from "$app/environment";

    export let data;

    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let shownIdx = browser 
        ? parseInt(document.cookie.split(";").find((c) => c.includes("prevShow"))?.split("=").at(1) ?? "-1")
        : -1;
    $: shownProg = shownIdx < 0 ? null : data.lastDp.concat(data.thisDp).at(shownIdx);
    const onSetClicked = (idx: number) => {
        shownIdx = idx;
        document.cookie = "prevShow=" + idx;
    }
    const clearShown = () => {
        shownIdx = -1;
        document.cookie = "prevShow=-1";
    }

    onMount(() => {
        preloadData(BS_HOME_SKIP_MENU);
    })

</script>

<div id="root">
    <div>
        <h1> Previous Games </h1>
        <p> Revisit games from the last two weeks. Finish any you might have missed.</p>
    </div>
    <div class="week">
        <h2> 
            This Week's Games
        </h2>
        <p>
            Play all your games for the best score!
        </p>
        <div class="week-container">
            <WeekContainer on:clicked={(e) => onSetClicked(e.detail.idx + 7)} dps={data.thisDp} />
        </div>
    </div>
    <div class="week">
        <h2> 
            Last Week's Games
        </h2>
        <p>
            Last week's score is final, finish games for fun.
        </p>
        <div class="week-container">
            <WeekContainer on:clicked={(e) => onSetClicked(e.detail.idx)} dps={data.lastDp} />
        </div>
    </div>
    <div class="buttons">
        <a href={BS_HOME_SKIP_MENU}> Go Home </a>
    </div>
</div>

<div id="modal" class:active={!!shownProg}>
    <h1> {weekdays[shownIdx % 7]}, Day {(shownIdx % 7) + 1}</h1>
    <div class="pin-container">
        {#if shownProg}
            <PinContainer
                setProgress={shownProg.gameProgs}
                links={[0, 1, 2, 3].map((n) => 
                    bsGameLink(shownProg?.set.id ?? "", n, BS_PREV))}
            />
        {/if}
    </div>
    <div class="buttons">
        <button on:click={clearShown}> Back </button>
    </div>
</div>

<style>
    #root {
        position: relative;
        width: calc(min(100vw, 50rem));
        margin: 0 auto;
        height: 100vh;
        height: 100svh;
        background: white;
        display: grid;
        grid-template-rows: 20% 35% 30% 15%;
        place-items: center;
        text-align: center;
        padding: 0 1rem;
    }

    #modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100%;
        border-left: 1px solid black;
        transform: translateX(100vw);
        transition: transform 300ms;
        background: white;
        z-index: 2;
        display: grid;
        grid-template-rows: 20% 50% 30%;
        place-items: center;
    }

    #modal.active {
        transform: translateX(-1px);
    }

    .pin-container {
        width: 80%;
        height: 100%;
    }

    .week {
        width: 100%;
    }

    .week:last-of-type {
        align-self: start;
    }

    .week-container { 
        margin-top: 1rem;
        font-size: 1.2rem;
    }

    p {
        font-style: italic;
    }

    .buttons a, button {
        text-decoration: none;
        border: none;
        min-width: 10rem;
        color: black;
        font-weight: 500;
        background: #c0c0c0;
        padding: 0.75rem 1rem;
        border-radius: 0.25rem;
        font-size: 1.2rem;
        cursor: pointer;
    }
</style>