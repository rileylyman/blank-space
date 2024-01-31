<script lang="ts">
    export let messages: Array<[string, boolean]>;
</script>

<div id="root">
    {#each messages as [msg, me]}
        {#if me}
            me:
        {/if}
        {msg}
    {/each}
</div>

<style>
    #root {
        width: 100%;
        height: 100%;
        background: white;
        display: grid;
    }
</style>