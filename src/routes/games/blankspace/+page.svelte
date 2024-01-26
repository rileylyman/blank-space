<script lang="ts">
    import Fa from 'svelte-fa';
    import { faUser, faSliders, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
    import { BS_GAME_LIST } from '$lib/links';

    export let data;

    enum State {
        Start,
        NormalRequested,
        Normal,
        SettingsRequested,
        SettingsOpen
    }
    let state = data.skip ? State.Normal : State.Start;
    
    let collapseDurationMs = 1500;
    let fadeInDurationMs = 500; // Keep in sink with transition: opacity
    const startCollapse = () => {
        state = State.NormalRequested;
        setTimeout(() => state = State.Normal, collapseDurationMs);
    }

    let selectedSetting = "";
    const toggleOpenSettings = (setting: string) => () => {
        selectedSetting = setting
        if (state == State.Normal) {
            state = State.SettingsRequested;
            setTimeout(() => state = State.SettingsOpen, fadeInDurationMs);
        } else if (state == State.SettingsOpen) {
            state = State.NormalRequested;
            setTimeout(() => state = State.Normal, collapseDurationMs);
        }
    }

    $: rootCollapsed = [State.NormalRequested, State.Normal, State.SettingsRequested].includes(state);
    $: rootOpenSettings = [State.SettingsOpen].includes(state);
    $: headerRevealed = [State.Start, State.NormalRequested, State.Normal].includes(state);
    $: headerContent = [State.Start, State.NormalRequested, State.Normal, State.SettingsRequested].includes(state);
    $: headerSubContent = [State.Start].includes(state);
    $: welcomeRevealed = [State.Normal].includes(state);
    $: welcomeContent = [State.Normal, State.SettingsRequested].includes(state);
    $: playButtonsRevealed = [State.Normal].includes(state);
    $: playButtonsContent = [State.Normal, State.SettingsRequested].includes(state);
    $: settingsRevealed = [State.Normal, State.SettingsRequested, State.SettingsOpen].includes(state);
    $: settingsContent = [State.Normal, State.SettingsRequested, State.SettingsOpen].includes(state);
    $: accountRevealed = settingsRevealed;
    $: accountContent = settingsContent;
    $: rulesRevealed = settingsRevealed;
    $: rulesContent = settingsContent;
</script>

<svelte:window on:click={() => {
    if (state === State.Start) startCollapse();
}} />

<div 
    class="root" 
    class:collapse={rootCollapsed} 
    class:open-settings={rootOpenSettings}
>
    <button class="header" class:revealed={headerRevealed} >
        {#if headerContent}
            <h1> <span class="left"> Blank </span> Space </h1>
            {#if headerSubContent}
                <h3> <span class="left">Slappy</span> Studios</h3>
            {/if}
        {/if}
    </button>

    <div class="welcome" class:revealed={welcomeRevealed}>
        {#if welcomeContent}
            <h2 style="max-width: 80vw; overflow-wrap: break-word"> Welcome, {data.pbUser?.username}</h2>
        {/if}
    </div>

    <div class="play-buttons" class:revealed={playButtonsRevealed}>
        {#if playButtonsContent}
            <a href={BS_GAME_LIST}>
                <div style="grid-row: span 2">Test new games</div>
                <div class="notifications"> {data.newGames} </div>
            </a>
            <a class="inactive" href={BS_GAME_LIST}>
                <div>Play Today's Game</div>
                <div class="desc">Not available yet</div>
            </a>
            <a href={BS_GAME_LIST}>
                <div>View Games</div>
                <div class="desc">See reviews from others</div>
                <!-- <div class="notifications"> 15 </div> -->
            </a>
        {/if}
    </div>

    <button 
        class="settings" 
        class:revealed={settingsRevealed} 
        class:selected={selectedSetting === "settings"}
        on:click={toggleOpenSettings("settings")}>
        {#if settingsContent}
            <Fa icon={faSliders} size="2x" />
        {/if}
    </button>

    <button 
        class="account" 
        class:revealed={accountRevealed}
        class:selected={selectedSetting === "account"}
        on:click={toggleOpenSettings("account")}
    >
        {#if accountContent}
            <Fa icon={faUser} size="2x" />
        {/if}
    </button>

    <button 
        class="rules" 
        class:revealed={rulesRevealed}
        class:selected={selectedSetting === "rules"}
        on:click={toggleOpenSettings("rules")}
    >
        {#if rulesContent}
            <Fa icon={faCircleInfo} size="2x" />
        {/if}
    </button>
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
        grid-template-rows: 1fr 0fr 0fr 0fr;
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas:
            "header      header     header"
            "welcome     welcome    welcome  "
            "play        play       play  "
            "settings    account    rules ";
        place-items: center;
        height: 100vh;
        height: 100svh;
        overflow: hidden;
    }

    .root.collapse {
        grid-template-rows: 1.2fr 0.5fr 2fr 0.5fr;
        transition: grid-template-rows 1500ms;
    }

    .root.open-settings {
        grid-template-rows: 0fr 0fr 0fr 1fr;
        transition: grid-template-rows 500ms;
    }

    .header {
        position: relative;
        grid-area: header;
        background: linear-gradient(to right, #000 0%, #000 50%, #fff 50%, #fff 100%);
        text-align: center;
        place-self: stretch;
        display: grid;
        place-items: center;
        text-transform: uppercase;
        outline: none;
        border: none;
    }

    .header h1 {
        font-size: 2.5rem;
        font-weight: 500;
        letter-spacing: 0.5rem;
        transform: translateX(-0.2rem);
    }

    .header h3 {
        position: absolute;
        bottom: 10%;
        transform: translateX(0.15rem);
        text-transform: lowercase;
        font-weight: 400;
    }

    .header .left {
        color: white;
    }

    .header, .welcome, .play-buttons, .settings, .account, .rules {
        opacity: 0;
        transition: opacity 500ms ease-in-out;
    }

    .revealed {
        opacity: 1;
    }

    .welcome {
        grid-area: welcome;
        padding: 0 1rem;
        text-align: center;
    }

    .welcome h2 {
        font-weight: 400;
    }

    .play-buttons {
        grid-area: play;
        display: grid;
    }

    .play-buttons a {
        display: grid;
        place-items: center;
        color: black;
        background: white;
        padding: 0.5rem 1rem;
        font-size: 1.5rem;
        text-transform: uppercase;
        border-radius: 0.5rem;
        border: 1px solid black;
        margin-bottom: 2rem;
        text-decoration: none;
        width: 80vw;
        grid-template-rows: 2fr 1fr;
        height: 4.5rem;
        position: relative;
    }

    .play-buttons a.inactive {
        pointer-events: none;
        cursor: not-allowed;
        background: #ddd;
        color: #666 !important;
        border-color: #666;
    }

    .play-buttons a .desc {
        font-size: 0.75rem;
    }

    .play-buttons a .notifications {
        position: absolute;
        top: 0;
        right: 0;
        transform: translateX(50%) translateY(-50%);
        background: red;
        color: white;
        width: 1.75rem;
        height: 1.75rem;
        font-size: 1rem;
        border-radius: 50%;
        padding: 0;
        display: grid;
        place-items: center;
    }

    .play-buttons a:visited {
        color: black;
    }

    .settings, .account, .rules {
        display: grid;
        place-items: center;
        place-self: stretch;
        border: none;
        outline: none;
        padding: 0;
        background: white;
    }

    .settings.selected, .account.selected, .rules.selected {
        background: black;
        color: white;
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