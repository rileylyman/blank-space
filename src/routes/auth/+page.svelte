<script lang="ts">
    import {
        AUTH_REDIRECT_ME_ACTION,
        AUTH_LOGOUT_ACTION,
        AUTH_LOGIN_ACTION,
        AUTH_REGISTER_ACTION
    } from '$lib/links';

    export let data;
    export let form;

    let state = form?.state ?? "welcome";
    $: welcomeMessage = state === "welcome" ? 'Welcome Back' : ( state === "signup" ? 'Create your account' : "Log In");
</script>

<div id="root">
    <h1> Slappy Games </h1>
    {#if state === "welcome"}
        {#if data.pbUser}
            <h2> Welcome back, {data.pbUser.username}! </h2>
            <div class="login">
                <form action={AUTH_REDIRECT_ME_ACTION} method="POST">
                    <button type="submit">Log back in</button>
                </form>
                <form action={AUTH_LOGOUT_ACTION} method="POST">
                    <button type="submit">Sign out</button>
                </form>
            </div>
        {:else}
            <div class="login">
                <button on:click={() => state = "login"}>Log in</button>
                <button on:click={() => state = "signup"}>Sign up</button>
                <button class="inactive" style="margin-top: 2rem"> Continue as guest </button>
            </div>
        {/if}
    {:else}
        <div class="login">
            <h2> {welcomeMessage} </h2>

            {#if state === "login"}
                <form action={AUTH_LOGIN_ACTION} method="POST">
                    <label for="email"> email/username </label>
                    <input id="email" name="email" type="text" autocomplete="username" value={form?.email ?? ''}/>

                    <label for="password"> password </label>
                    <input id="password" name="password" type="password" autocomplete="current-password"/>
                    <a href="/auth/reset"> Forgot password </a>

                    <ul>
                        {#each form?.errors ?? [] as e}
                            <li>{e}</li>
                        {/each}
                    </ul>

                    <button style="margin-top: 3rem" type="submit">Submit</button>
                    <button style="margin-top: 1rem" on:click={() => state = "welcome"}>Go back</button>

                </form>
            {:else if state == "signup"}
                <form action={AUTH_REGISTER_ACTION} method="POST">
                    <label for="username"> username </label>
                    <input id="username" name="username" type="text" autocomplete="username" value={form?.username ?? ''} placeholder="only your username will be public" />

                    <label for="email"> email </label>
                    <input id="email" name="email" type="text" autocomplete="email" value={form?.email ?? ''} />

                    <label for="confirm-email"> confirm email </label>
                    <input id="confirm-email" name="emailConfirm" type="text" autocomplete="email" value={form?.emailConfirm ?? ''} />

                    <label for="password"> password </label>
                    <input id="password" name="password" type="password" autocomplete="new-password"/>

                    <label for="password-confirm"> confirm password </label>
                    <input id="password-confirm" name="passwordConfirm" type="password" autocomplete="new-password" />

                    <ul>
                        {#each form?.errors ?? [] as e}
                            <li>{e}</li>
                        {/each}
                    </ul>

                    <button style="margin-top: 0.5rem" type="submit">Submit</button>
                    <button style="margin-top: 0.5rem" on:click={() => state = "welcome"}>Go back</button>
                </form>
            {/if}
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
        max-height: 100vh;
        width: 100vw;
        max-width: 50rem;
        margin: 0 auto;
        align-items: center;
        overflow: hidden;
    }

    h1 {
        margin-top: 3rem;
        text-transform: uppercase;
        font-weight: 500;
    }

    h2 {
        font-weight: 400;
    }

    .login {
        display: flex;
        flex-direction: column;
        align-self: center;
        width: 100%;
        align-items: center;
    }

    button, input {
        outline: none;
        height: 3rem;
        border-radius: 0.5rem;
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

    .inactive {
        pointer-events: none;
        background: #555;
        color: #ccc;
    }
</style>

