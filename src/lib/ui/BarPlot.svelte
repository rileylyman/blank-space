<script lang="ts">
    export let bars: Map<string, number>;

    let truncateTo = 4;
    let truncate = true;
    
    let normalizedBars: Map<string, number> = new Map();
    $: {
        normalizedBars = new Map();
        let max = 0;
        bars.forEach((v) => max = Math.max(v, max));
        bars.forEach((v, k) => normalizedBars.set(k, v / max));
    }
</script>

<div id="root">
    {#each normalizedBars as [barKey, barValue], idx}
        {#if idx < truncateTo || !truncate}
            <span class="key">{barKey}</span>
            <span class="bar" style={`width: ${barValue * 100}%`}> <span class="label"> {bars.get(barKey)} </span> </span>
        {/if}
    {/each}
    {#if bars.size > truncateTo && truncate}
        <button on:click={() => truncate = false}> see more </button>
    {:else if bars.size > truncateTo}
        <button on:click={() => truncate = true}> see less </button>
    {/if}
</div>

<style>
    #root {
        display: grid;
        grid-template-columns: 1fr 2fr;
        justify-items: start;
        align-items: center;
        row-gap: 2px;
        column-gap: 1rem;
    }

    button {
        grid-column: span 2;
        place-self: center;
        justify-self: left;
        width: 100%;
        background: none;
        color: grey;
        text-decoration: underline;
        border: none;
        font-size: 0.8rem;
        margin-top: 0.5rem;
    }

    .key {
        justify-self: end;
        white-space: nowrap;
        overflow: hidden;
        font-size: 0.8rem;
        text-align: right;
        font-style: italic;
        padding-right: 0.1rem;
    }

    .bar {
        background: black;
        height: 80%;
        border-radius: 0.25rem;
        position: relative;
    }

    .label {
        position: absolute;
        color: white;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.8rem;
    }
</style>