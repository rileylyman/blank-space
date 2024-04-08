<script lang="ts">
    import { preloadData } from "$app/navigation";
    import { AUTH_LOGOUT_ACTION, BS_HOME_SKIP } from "$lib/links";
    import { onMount } from "svelte";

    export let data;

    onMount(() => {
        preloadData(BS_HOME_SKIP);
    })
</script>

<div id="root">
    <h1> Manage your account </h1>
    <h2> Email </h2>
    <p> {data.pbUser?.email} </p>
    <a href="/auth/reset?from=/account"> Change password </a>
    <form action={AUTH_LOGOUT_ACTION} method="POST">
    <button type="submit"> Logout </button>
    </form>
    <a href={BS_HOME_SKIP}> Go Home </a>
</div>

<style>
</style>