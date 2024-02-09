<script lang="ts">
    export let bars: Map<string, number>;
    export let allowTruncate: boolean;

    let truncateTo = 4;
    let truncate = true;
    let maxChars = 0;
    
    let normalizedBars: Map<string, number> = new Map();
    $: {
        normalizedBars = new Map();
        let max = 0;
        bars.forEach((v) => max = Math.max(v, max));
        bars.forEach((v, k) => normalizedBars.set(k, v / max));

        let i = 0;
        maxChars = 0;
        for (let [key, _] of bars.entries()) {
            if (allowTruncate && truncate && i >= truncateTo) break;
            maxChars = Math.max(maxChars, key.length);
            i += 1;
        }
    }
</script>

<div id="root">
    {#each normalizedBars as [barKey, barValue], idx}
        {#if !allowTruncate || !truncate || idx < truncateTo}
            <span class="bar-container">
                <span class="key">{barKey}</span>
                <span class:full={barValue > 0.97} class="bar" style={`width: ${barValue * 100}%`}>
                    <span class="label"> 
                        {bars.get(barKey)} 
                    </span>
                </span>
            </span>
        {/if}
    {/each}
    {#if allowTruncate}
        {#if bars.size > truncateTo && truncate}
            <button on:click={() => truncate = false}> see more </button>
        {:else if bars.size > truncateTo}
            <button on:click={() => truncate = true}> see less </button>
        {/if}
    {/if}
</div>

<style>
    #root {
        display: grid;
        justify-items: start;
        align-items: center;
        row-gap: 0.3rem;
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
        white-space: nowrap;
        font-size: 0.8rem;
        font-style: italic;
        position: absolute;
        text-align: left;
        z-index: 10;
        top: 50%;
        transform: translateY(-50%);
        left: 0.5rem;
    }

    .bar-container {
        width: 100%;
        height: 1.5rem;
        display: grid;
        background: rgb(251, 251, 251);
        align-items: stretch;
        overflow: hidden;
        position: relative;
        border: 1px solid black;
    }

    .bar {
        background: rgb(214, 214, 214);
        border-right: 1px solid grey;
        position: relative;
    }

    .bar.full {
        border-right: none;
    }

    .label {
        position: absolute;
        right: 0.7rem;
        top: 50%;
        font-weight: bold;
        transform: translateY(-50%);
        font-size: 0.8rem;
    }
</style>