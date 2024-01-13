<script lang="ts">
    import Fa from 'svelte-fa';
    import { faUser, faSliders, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
    import OptionSlider from '$lib/ui/OptionSlider.svelte';
    let collapse = false;
    let showContent = false;

    let collapseDurationMs = 1500;

    const startCollapse = () => {
        collapse = true;
        setTimeout(() => showContent = true, collapseDurationMs);
    }
</script>

<div class="root" class:collapse style="transition: grid-template-rows {collapseDurationMs}ms">
    <div class="header" on:click={startCollapse}>
        <h1> <span class="left"> Blank </span> Space </h1>
        {#if !collapse}
            <h3> <span class="left">Slappy</span> Studios</h3>
        {/if}
    </div>

    <div class="game-mode" class:revealed={showContent}>
        {#if showContent}
            <h2> Game Mode </h2>
            <OptionSlider options={["Easy", "Medium", "Hard"]}/>
        {/if}
    </div>

    <div class="play-button" class:revealed={showContent}>
        {#if showContent}
            <a href="/games">
                Play
            </a>
        {/if}
    </div>

    <div class="settings" class:revealed={showContent}>
        {#if showContent}
            <Fa icon={faSliders} size="2x" />
        {/if}
    </div>

    <div class="account" class:revealed={showContent}>
        {#if showContent}
            <Fa icon={faUser} size="2x" />
        {/if}
    </div>

    <div class="rules" class:revealed={showContent}>
        {#if showContent}
            <Fa icon={faCircleInfo} size="2x" />
        {/if}
    </div>
</div>

<style>
    :global(html) {
        font-family: 'Fira Sans', sans-serif;
    }

    :root {
        background-color: black;
    }

    .root {
        background-color: white;
        display: grid;
        grid-template-rows: 0fr 1fr 0fr 0fr 0fr;
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas:
            ".        .       .     "
            "header   header  header"
            "mode     mode    mode  "
            "play     play    play  "
            "settings account rules ";
        place-items: center;
        height: 100vh;
        height: 100svh;
        overflow: hidden;
    }

    .root.collapse {
        grid-template-rows: 0fr 1.5fr 1.5fr 2fr 0.5fr;
    }

    .header {
        position: relative;
        grid-area: header;
        background: linear-gradient(to right, #000 0%, #000 50%, #fff 50%, #fff 100%);
        text-align: center;
        place-self: stretch;
        display: grid;
        place-items: center;
    }

    .header h3 {
        position: absolute;
        bottom: 10%;
        transform: translateX(0.25rem);
    }

    .header .left {
        color: white;
    }

    .game-mode, .play-button, .settings, .account, .rules {
        opacity: 0;
        transition: opacity 1500ms ease-in-out;
    }

    .revealed {
        opacity: 1;
    }

    .game-mode {
        grid-area: mode;
        padding: 0 1rem;
        text-align: center;
    }

    .play-button {
        grid-area: play;
        display: grid;
    }

    .play-button a {
        place-items: center;
        color: black;
        background: white;
        padding: 1rem 2rem;
        font-size: 2rem;
        text-transform: uppercase;
        border-radius: 0.5rem;
        border: 1px solid black;
        margin-bottom: 2rem;
        text-decoration: none;
    }

    .play-button a:visited {
        color: black;
    }

    .settings, .account, .rules {
        display: grid;
        place-items: center;
        place-self: stretch;
    }

    .settings {
        grid-area: settings;
    }

    .account {
        grid-area: account;
    }

    .rules {
        grid-area: rules;
    }
</style>