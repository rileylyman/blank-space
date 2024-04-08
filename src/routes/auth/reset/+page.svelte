<script lang="ts">
    import { page } from '$app/stores';

    export let form;

    const from = $page.url.searchParams.get('from') ?? '/';
</script>

<div id="root">
    <h1> Reset your password </h1>
    <form action="?/reset" method="POST">
        <input type="text" name="email" value={form?.email ?? ""} />
        <button type="submit"> Submit </button>
    </form>

    <a href={from}> Done </a>


    {#if form}
        <div class="popup" class:error={form.error}>
            {#if form.error}
                Invalid email
            {:else if form.email}
                Email sent to {form.email}
            {/if}
        </div>
    {/if}
</div>

<style>
</style>