<script lang="ts">
    export let left: number;
    export let right: number;
</script>

<div id="root" style={`grid-template-columns: ${left}fr ${right}fr`}>
    {#if left !== 0 || right !== 0}
        <div id="left" />
        <div id="right" />
    {/if}
</div>

<style>
    #root {
        height: 100%;
        width: 100%;
        background: #aaa;
        display: grid;
        place-items: stretch;
    }

    #left {
        background-color: rgb(80, 194, 104);
    }

    #right {
        background: rgb(250, 113, 79);
    }
</style>