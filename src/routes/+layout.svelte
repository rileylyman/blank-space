<script lang="ts">
    import Spinner from "$lib/ui/Spinner.svelte";
    import { navigating } from "$app/stores";
    import { sleepMs } from "$lib/utils";
</script>

{#if $navigating}
    {#await sleepMs(50) then}
        <Spinner />
    {/await}
{:else}
    <slot /> 
{/if}