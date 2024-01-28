<script lang="ts">
    import { AUTH_REDIRECT_ME_ACTION } from '$lib/links.js';

    export let data;

    let resendButton = 'Resend email';
    let resendButtonActive = true;
    
    const resendEmail = async () => {
        resendButtonActive = false;
        resendButton = 'Resending...';
        let response = await fetch('/auth/verify/resend_email', { method: 'POST' });
        let json = await response.json();
        if (json.success) {
            resendButton = 'Email resent';
        } else {
            resendButton = 'Error';
        }
    }
</script>

<div id="root">
    <h1> Slappy Games </h1>

    <div>
        {#if data?.verified}
            <h2> Email verified </h2>
            <p> You're all set. Click the link below to sign in. Welcome to Slappy Games! </p>
            <form action={AUTH_REDIRECT_ME_ACTION} method="POST">
                <button type="submit"> Log in </button>
            </form>
        {:else}
            {#if !data?.error}
                <h2> Check your inbox </h2>
                <p> 
                    An email was sent to 
                    {#if data.email}
                        <b> {data.email}. </b>
                    {:else}
                        your address
                    {/if}
                    Click the link to verify your account. Refresh this page when
                    you are done. 
                </p>
            {:else}
                <h2> Oops! </h2>
                <p> We ran into an error. This link is either invalid or expired. </p>
            {/if}
            <button 
                on:click={resendEmail}
                class:inactive={!resendButtonActive}
            > 
                {resendButton} 
            </button>
            <form action={AUTH_REDIRECT_ME_ACTION} method="POST">
                <button type="submit"> Go home </button>
            </form>
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

    button {
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

    button.inactive {
        background: lightgrey;
        color: black;
        pointer-events: none;
    }
</style>