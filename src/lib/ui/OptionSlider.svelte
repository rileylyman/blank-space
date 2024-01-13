<script lang="ts">
    export let options: string[];
    export let optionIdx = 0;
</script>

<div id="root" style={`grid-template-columns: repeat(${options.length}, minmax(0, 1fr))`}>
    {#each options as option, idx}
        <button class="option" on:click={() => optionIdx = idx}>
            {option}
        </button>
    {/each}
    <button style={`grid-column: ${optionIdx + 1} / span 1`} class="overlapper">
        {options[optionIdx]}
    </button>
</div>

<style>
    @import '$lib/css/button-reset.css';

    #root {
        display: grid;
        place-items: center;
        background: white;
        border: 1px solid black;
        position: relative;
    }

    .option, .overlapper {
        font-size: 1.25rem;
        text-transform: uppercase;
        display: grid;
        place-items: center;
        cursor: pointer;
        width: 100%;
        height: 2.5rem;
    }

    .overlapper {
        width: 105%;
        height: 150%;
        z-index: 1;
        position: absolute;
        background: black;
        color: white;
        border: 1px solid black;
        border-radius: 1rem;
        transition: grid-column 1s;
        font-weight: bold;
    }

    .overlapper:hover {
        background: white;
    }

    button {
        border: none;
    }
</style>