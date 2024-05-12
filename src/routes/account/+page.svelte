<script lang="ts">
    import { preloadData } from "$app/navigation";
    import { AUTH_LOGOUT_ACTION, BS_HOME_SKIP } from "$lib/links";
    import OptionSlider from "$lib/ui/OptionSlider.svelte";
    import { setWantHomeMenu } from "$lib/utils.js";
    import { onMount } from "svelte";

    export let data;
    export let form;

    $: prefs = form?.prefs ?? data.prefs;
    $: prefsUpdated = (prefs.peacefulMode ? 0 : 1) !== difficultyIdx;
    let difficultyIdx = form?.prefs.peacefulMode ?? data.prefs.peacefulMode ? 0 : 1;

    onMount(() => {
        difficultyIdx = prefs.peacefulMode ? 0 : 1;
        if (data.from === BS_HOME_SKIP) {
            setWantHomeMenu(true);
            preloadData(BS_HOME_SKIP);
        }
    })
</script>

<div id="root">
    <h1> Manage your account </h1>

    <h2> Account Info </h2>
    <div class="account-info">
        <p class="header"> Username </p>
        <p class="value"> {data.pbUser?.username} </p>
        <p class="header"> Email </p>
        <p class="value"> {data.pbUser?.email} </p>
    </div>

    <h2> Preferences </h2>
    <div class="prefs">
        <form action="?/prefs" method="POST">
            <OptionSlider options={["Peaceful", "Hardcore"]} bind:optionIdx={difficultyIdx} label="Difficulty:" />
            <input type="hidden" name="peacefulMode" value={difficultyIdx === 0 ? "on" : "off"} />
            <input type="hidden" name="from" value={form?.from ?? data.from} />

            <button class="button" class:inactive={!prefsUpdated} type="submit"> Save Changes </button>
        </form>
    </div>

    <div class="buttons">
        <a class="button" href="/auth/reset?from=/account"> Change password </a>
        <form action={AUTH_LOGOUT_ACTION} method="POST" class="logout-form">
            <button class="button" type="submit"> Logout </button>
        </form>
        <a class="button" href={form?.from ?? data.from}> Done </a>
    </div>
</div>

<style>
    #root {
        align-items: center;
        justify-items: start;
        height: 100vh;
        height: 100svh;
        width: calc(min(50rem, 100vw));
        margin: 0 auto;
        padding: 0 1rem;
    }

    h2 {
        margin-bottom: 0.5rem;
        margin-top: 2rem;
    }

    .prefs {
        border: 1px solid black;
        border-radius: 0.5rem;
        padding: 1rem;
        width: calc(100% - 2rem);
    }

    .prefs button {
        margin: 1.5rem auto;
        margin-bottom: 0;
        width: min-content;
        white-space: nowrap;
    }

    .account-info {
        display: grid;
        align-items: center;
        justify-items: start;
        grid-template-columns: 30% 70%;
        border: 1px solid black;
        border-radius: 0.5rem;
        padding: 1rem;
        width: calc(100% - 2rem);
    }

    .account-info .header {
        text-align: right;
        justify-self: end;
        width: 100%;
        padding-right: 0.5rem;
        white-space: nowrap;
        font-size: 0.9rem;
    }

    .account-info .value {
        font-weight: 600;
    }

    .buttons {
        width: 100%;
        display: grid;
        place-items: center;
        margin-top: 2rem;
    }

    .logout-form {
        width: 100%;
        display: grid;
        place-items: center;
    }

    .button {
        color: black;
        text-decoration: none;
        background: #c0c0c0;
        border: none;
        font-weight: 600;
        display: grid;
        place-items: center;
        padding: 0.5rem 1rem;
        width: 80%;
        border-radius: 0.5rem;
        margin-top: 1rem;
        transition: background 250ms, color 250ms;
    }

    .button.inactive {
        pointer-events: none;
        background: #e0e0e0;
        color: #555;
    }
</style>