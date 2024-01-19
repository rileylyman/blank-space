<script lang="ts">
    import { BS_HOME_SKIP } from '$lib/links';

    export let data;
</script>

{#if !data.game}
    <h1> Oops! </h1>
    <h2> Something went wrong </h2>
    <p> 
        That game doesn't exist. This might be an old or incorrect link. 
        <a href={BS_HOME_SKIP}> Go home.</a>
    </p>
{:else}
{/if}