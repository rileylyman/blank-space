<script lang="ts">
    import OptionSlider from '$lib/ui/OptionSlider.svelte';
    let collapse = false;
    let showContent = false;

    let collapseDurationMs = 2000;

    const startCollapse = () => {
        collapse = true;
        setTimeout(() => showContent = true, collapseDurationMs);
    }
</script>

<div class="root" class:collapse style="transition: grid-template-rows {collapseDurationMs}ms">
    <div class="header" on:click={startCollapse}>
        <h1> <span class="left"> Blank </span> Space </h1>
    </div>

    <div class="game-mode">
        {#if showContent}
            <h2> Game Mode </h2>
            <OptionSlider options={["Easy", "Medium", "Hard"]}/>
        {/if}
    </div>

    <div class="play-button">
        {#if showContent}
            <button>
                Play
            </button>
        {/if}
    </div>

    <div class="settings">
        {#if showContent}
            Settings
        {/if}
    </div>

    <div class="account">
        {#if showContent}
            Account
        {/if}
    </div>

    <div class="rules">
        {#if showContent}
            Rules
        {/if}
    </div>
</div>

<style>
    :global(html) {
        font-family: 'Fira Sans', sans-serif;
    }

    :global(html) {
        height: 100%;
    }

    :global(body) {
        height: 100%;
        margin: 0;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background: black; 
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
        grid-template-rows: 0fr 1.5fr 2fr 2fr 1fr;
    }

    .header {
        grid-area: header;
        background: linear-gradient(to right, #000 0%, #000 50%, #fff 50%, #fff 100%);
        text-align: center;
        place-self: stretch;
        display: grid;
        place-items: center;
    }

    .root.collapse .header {
    }

    .header .left {
        color: white;
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

    .play-button button {
        place-items: center;
        color: black;
        background: white;
        padding: 1rem 2rem;
        font-size: 2rem;
        text-transform: uppercase;
        border-radius: 0.5rem;
        border: 1px solid black;
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