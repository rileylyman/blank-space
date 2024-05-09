<script lang="ts">
    import { BS_HOME_SKIP } from '$lib/links.js';
    import { faX } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';
    export let data;
</script>

<div id="root">
    <div id="how-to-text-container">
        {@html data.text}
    </div>

    <a id="back" href={BS_HOME_SKIP}> <Fa icon={faX} /> </a>
</div>

<style>
    #root {
        min-height: 100vh;
        min-height: 100svh;
        width: calc(min(50rem, 100vw));
        margin: 0 auto;
        padding: 1rem;
    }

    :global(#how-to-text-container p, #how-to-text-container div) {
        margin-top: 1rem;
    }

    #back {
        position: fixed;
        top: 2rem;
        right: 0rem;
        transform: translateX(-50%);
        color: black;
        text-decoration: none;
        background: #c0c0c0;
        font-size: 1.2rem;
        width: 3rem;
        height: 3rem;
        border: 1px solid black;
        border-radius: 50%;
        display: grid;
        place-items: center;
    }
</style>
