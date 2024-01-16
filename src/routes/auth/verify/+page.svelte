<script lang="ts">
    import { page } from '$app/stores';

    const {
        stage,
        email,
        redirectTo,
    } = Object.fromEntries($page.url.searchParams);
    $: redirectParam = redirectTo ? `?redirectTo=${redirectTo}` : '';

    const resendEmail = async () => {
    }
</script>

<div id="root">
    <h1> Slappy Games </h1>

    <div>
        {#if stage === 'wait'}
            <h2> Check your inbox </h2>
            <p> An email was sent to your address <b>{email}</b>. Click the link to verify your account. </p>
            <button on:click={resendEmail}> Resend email </button>
        {:else if stage === 'verify'}
            <h2> Email verified </h2>
            <p> You're all set. Click the link below to sign in. Welcome to Slappy Games! </p>
            <a href={`/auth${redirectParam}`}> Log in </a>
        {:else}
            <h2> Oops! </h2>
            <p> We ran into an error. This link is either invalid or expired. </p>
            <a href={`/home${redirectParam}`}> Go home </a>
        {/if}
    </div>
    <div />
    <div />
</div>

<style>
    #root {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-content: space-between;
        height: 100vh;
        height: 100svh;
        width: 80%;
        margin: 0 auto;
    }

    a, button {
        text-decoration: none;
        outline: none;
        border: none;
        border-radius: 0.5rem;
        color: white;
        font-weight: bold;
        background: black;
        height: 3rem;
        width: 50%;
        display: block;
        margin: 2rem auto;
        font-size: 1.2rem;
        display: grid;
        place-items: center;
    }
</style>