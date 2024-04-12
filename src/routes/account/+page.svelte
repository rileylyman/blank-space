<script lang="ts">
    import { preloadData } from "$app/navigation";
    import { AUTH_LOGOUT_ACTION, BS_HOME_SKIP_MENU } from "$lib/links";
    import { onMount } from "svelte";

    export let data;

    onMount(() => {
        preloadData(BS_HOME_SKIP_MENU);
    })
</script>

<div id="root">
    <h1> Manage your account </h1>
    <div class="account-info-container">
        <h2> Account Info </h2>
        <div class="account-info">
            <p class="header"> Username </p>
            <p class="value"> {data.pbUser?.username} </p>
            <p class="header"> Email </p>
            <p class="value"> {data.pbUser?.email} </p>
        </div>
    </div>
    <div class="buttons">
        <a class="button" href="/auth/reset?from=/account"> Change password </a>
        <form action={AUTH_LOGOUT_ACTION} method="POST">
            <button class="button" type="submit"> Logout </button>
        </form>
        <a class="button" href={BS_HOME_SKIP_MENU}> Back </a>
    </div>
</div>

<style>
    #root {
        display: grid;
        align-items: center;
        justify-items: start;
        grid-template-rows: 15% 30% 30%;
        height: 100vh;
        height: 100svh;
        width: calc(min(50rem, 100vw));
        margin: 0 auto;
        padding-left: 1rem;
    }

    .account-info-container {
        width: 100%;
    }

    h2 {
        margin-bottom: 0.5rem;
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
        grid-template-rows: 4rem 4rem 4rem;
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
        width: 10rem;
        border-radius: 0.5rem;
    }
</style>