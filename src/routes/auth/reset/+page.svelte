<script lang="ts">
    import { page } from '$app/stores';

    export let form;

    const from = $page.url.searchParams.get('from') ?? '/';
    let hidePopup = false;
</script>

<div id="root">
    <h1> Reset your password </h1>

    <div class="reset-container">
        <h2> Enter your email </h2>
        <form action="?/reset" method="POST">
            <input type="text" name="email" value={form?.email ?? ""} />
            <button class="button" type="submit"> Submit </button>
        </form>
    </div>

    <a class="button" href={from}> Go Home </a>


    {#if form && !hidePopup}
        <div class="popup" class:error={form.error}>
            {#if form.error}
                Invalid email
            {:else if form.email}
                Email sent to {form.email}
            {/if}
            <button class="x" on:click={() => hidePopup = true}>
                x
            </button>
        </div>
    {/if}
</div>

<style>
    #root {
        display: grid;
        place-items: center;
        grid-template-rows: 15% 30% 5%;
        height: 100vh;
        height: 100svh;
        width: calc(min(50rem, 100vw));
        margin: 0 auto;
        position: relative;
    }

    .popup {
        position: absolute;
        height: 15%;
        width: 60%;
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgb(98, 191, 118);
        border-radius: 0.5rem;
        font-weight: 600;
        display: grid;
        place-items: center;
        text-align: center;
    }

    .popup.error {
        background: rgb(231, 139, 117);
    }

    .popup .x {
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        top: 0;
        right: 0;
        transform: translateX(25%) translateY(-25%);
        background: grey;
        border-radius: 50%;
        display: grid;
        place-items: center;
        border: none;
        padding: 0;
    }

    .reset-container {
        width: 100%;
        display: grid;
        grid-template-rows: 1fr 2fr 1fr;
        height: 100%;
        place-items: center;
    }

    form {
        display: grid;
        place-items: center;
    }

    input {
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        outline: none;
        border: 1px solid black;
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
        width: 7rem;
        border-radius: 0.5rem;
        margin-top: 0.5rem;
    }
</style>