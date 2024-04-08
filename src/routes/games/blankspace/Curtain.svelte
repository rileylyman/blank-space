<script lang="ts">
    export let foldedHeight: string;

    export let folded: boolean;
    $: heightStyle = folded
        ? `grid-template-rows: ${foldedHeight};`
        : `grid-template-rows: 100%`;
</script>

<div id="root" style={heightStyle}>
    <div class="curtain">
        <h1><span style="color: white">blank</span> space</h1>
        <h2 class:hidden={folded}><span style="color: white">slappy</span> studios</h2>
        <button on:click={() => folded = !folded}></button>
    </div>
</div>

<style>
    #root {
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        display: grid;
        place-items: stretch;
        transition: grid-template-rows 1000ms;
        pointer-events: none;
        z-index: 10;
    }

    .curtain {
        background: linear-gradient(to right, #000 0%, #000 50%, #fff 50%, #fff 100%);
        border-bottom: 2px solid black;
        position: relative;
        display: grid;
        place-items: center;
        pointer-events: all;
    }

    .curtain > h1 {
        transform: translateX(-0.2rem);
        font-size: 2.5rem;
        letter-spacing: 0.5rem;
        text-transform: uppercase;
        font-weight: 500;
    }

    .curtain > h2 {
        position: absolute;
        bottom: 10%;
        transform: translateX(0.15rem);
        font-weight: 400;
        text-transform: lowercase;
        transition: opacity 500ms;
    }

    .hidden {
        opacity: 0;
    }

    button {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
</style>