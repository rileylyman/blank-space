<script lang="ts">
    import { State } from '$lib/loginstate';
    import { page } from '$app/stores';

    let error = "";
    let allowPasswordReset = true;
    $: welcomeMessage = state == State.LogIn ? 'Welcome Back' : 'Create your account';


    export let form;
    let state = form?.state ?? State.Prompt;
    let redirectTo = form?.redirectTo ?? $page.url.searchParams.get('redirectTo');
    $: errors = form?.errors?.filter(err => err.v).map(err => {
        if (!err.v) return null;
        return `${err.k}: ${err.v}`;
    }) ?? [];
    console.log(form);
</script>

<div id="root">
    <h1> Slappy Games </h1>
    {#if state == State.Prompt}
        <div class="login">
            <button on:click={() => state = State.LogIn}>Log in</button>
            <button on:click={() => state = State.SignUp}>Sign up</button>
            <button> Continue as guest </button>
        </div>
    {:else if state == State.PasswordReset}
        <div class="login">
            <h2> Password reset </h2>
            <label for="email"> email </label>
            <input id="email" type="text" />
            <button on:click={() => error = "Incorrect email or password"}>Submit</button>
        </div>
    {:else}
        <div class="login">
            <h2> {welcomeMessage} </h2>

            {#if state == State.LogIn}
                <form action="?/login" method="POST">
                    <label for="email"> email </label>
                    <input id="email" name="email" type="text" autocomplete="username" value={form?.email ?? ''}/>

                    <label for="password"> password </label>
                    <input id="password" name="password" type="password" autocomplete="current-password"/>

                    <input type="hidden" name="redirectTo" value={redirectTo}>

                    <button type="submit">Submit</button>
                </form>
            {:else if state == State.SignUp}
                <form action="?/register" method="POST">
                    <label for="username"> username </label>
                    <input id="username" name="username" type="text" autocomplete="username" value={form?.username ?? ''} />

                    <label for="email"> email </label>
                    <input id="email" name="email" type="text" autocomplete="email" value={form?.email ?? ''} />

                    <label for="password"> password </label>
                    <input id="password" name="password" type="password" autocomplete="new-password"/>

                    <label for="password-confirm"> confirm password </label>
                    <input id="password-confirm" name="passwordConfirm" type="password" autocomplete="new-password" />

                    <input type="hidden" name="redirectTo" value={redirectTo}>

                    <ul>
                        {#each errors as e}
                            <li>{e}</li>
                        {/each}
                    </ul>

                    <button type="submit">Submit</button>
                </form>
            {/if}
            
            <p class:hidden={!error}> {error}
                {#if allowPasswordReset}
                    <br /> 
                    <button 
                        class="reset-password" 
                        on:click={() => state = State.PasswordReset}
                    >
                        Reset your password
                    </button> 
                {/if}
            </p>

        </div>
    {/if}
    <div />
</div>

<style>
    #root {
        text-align: center;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        height: 100vh;
        height: 100svh;
        width: 100vw;
        align-items: center;
    }

    h1 {
        text-transform: uppercase;
    }

    .login {
        display: flex;
        flex-direction: column;
        align-self: center;
        width: 100%;
        align-items: center;
    }
    
    .login button:last-child {
        margin-top: 2rem;
    }

    button, input {
        outline: none;
        height: 3rem;
        border-radius: 0.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        text-align: center;
        width: 60%;
    }

    button {
        background: black;
        color: white;
        border: none;
    }

    input {
        border: 1px solid black;
        border-radius: 0.5rem;
        height: 3rem;
        width: 80%;
    }

    .hidden {
        visibility: hidden;
    }

    .reset-password {
        color: blue;
        text-decoration: underline;
        outline: none;
        background: white;
        margin: 0 !important;
        border: none;
        display: inline;
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form input {
        text-align: left;
        padding-left: 1rem;
    }

    label {
        text-align: left;
        align-self: flex-start;
        width: min-content;
        margin-left: 15%;
        background: white;
        transform: translateY(50%);
        padding: 0 0.2rem;
        white-space: nowrap;
    }

    ul {
        align-self: flex-start;
    }

    li {
        font-size: 0.8rem;
        text-align: left;
        margin-left: 1rem;
        color: red;
    }
</style>

