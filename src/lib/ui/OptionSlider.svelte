<script lang="ts">
    export let label: string | null = null;
    export let options: string[];
    export let optionIdx = 0;

    $: labelN = label === null ? 0 : 1;
</script>

<div id="root" style={`grid-template-columns: repeat(${options.length + labelN}, minmax(0, 1fr))`}>
    {#if label !== null}
        {label}
    {/if}
    {#each options as option, idx}
        <button type="button" class="option" on:click={() => optionIdx = idx}>
            {option}
        </button>
    {/each}
    <span style={`grid-column: ${optionIdx + 1 + labelN} / span 1`} class="overlapper">
        {options[optionIdx]}
    </span>
</div>

<style>
    #root {
        display: grid;
        place-items: center;
        background: white;
        position: relative;
    }

    .option, .overlapper {
        display: grid;
        place-items: center;
        cursor: pointer;
        width: 100%;
        height: 2.5rem;
        border: 1px solid black;
        outline: none;
        background: white;
    }

    .option:first-of-type {
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
    }

    .option:last-of-type {
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
    }

    .overlapper {
        width: 105%;
        height: 115%;
        z-index: 1;
        position: absolute;
        background: #d0d0d0;
        border: 1px solid black;
        border-radius: 0.5rem;
        transition: grid-column 1s;
    }

    .overlapper:hover {
        background: white;
    }

    button {
        border: none;
    }
</style>