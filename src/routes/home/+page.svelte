<script lang="ts">
    import Fa from 'svelte-fa';
    import { faUser, faSliders, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
    import OptionSlider from '$lib/ui/OptionSlider.svelte';

    enum State {
        Start,
        NormalRequested,
        Normal,
        SettingsRequested,
        SettingsOpen
    }
    let state = State.Start;
    
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
    $: gameModeRevealed = [State.Normal].includes(state);
    $: gameModeContent = [State.Normal, State.SettingsRequested].includes(state);
    $: playButtonRevealed = [State.Normal].includes(state);
    $: playButtonContent = [State.Normal, State.SettingsRequested].includes(state);
    $: settingsRevealed = [State.Normal, State.SettingsRequested, State.SettingsOpen].includes(state);
    $: settingsContent = [State.Normal, State.SettingsRequested, State.SettingsOpen].includes(state);
    $: accountRevealed = settingsRevealed;
    $: accountContent = settingsContent;
    $: rulesRevealed = settingsRevealed;
    $: rulesContent = settingsContent;
</script>

<div 
    class="root" 
    class:collapse={rootCollapsed} 
    class:open-settings={rootOpenSettings}
>
    <button 
        class="header" 
        class:revealed={headerRevealed} 
        on:click={startCollapse}
    >
        {#if headerContent}
            <h1> <span class="left"> Blank </span> Space </h1>
            {#if headerSubContent}
                <h3> <span class="left">Slappy</span> Studios</h3>
            {/if}
        {/if}
    </button>

    <div class="game-mode" class:revealed={gameModeRevealed}>
        {#if gameModeContent}
            <h2> Game Mode </h2>
            <OptionSlider options={["Easy", "Medium", "Hard"]}/>
        {/if}
    </div>

    <div class="play-button" class:revealed={playButtonRevealed}>
        {#if playButtonContent}
            <a href="/games">
                Play
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
        transition: grid-template-rows 1500ms;
    }

    .root.open-settings {
        grid-template-rows: 0fr 0fr 0fr 0fr 1fr;
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
        letter-spacing: 0.5rem;
        transform: translateX(-0.2rem);
    }

    .header h3 {
        position: absolute;
        bottom: 10%;
        transform: translateX(0.25rem);
        text-transform: lowercase;
    }

    .header .left {
        color: white;
    }

    .header, .game-mode, .play-button, .settings, .account, .rules {
        opacity: 0;
        transition: opacity 500ms ease-in-out;
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