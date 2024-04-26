<script lang="ts">
    import { ANNOUNCEMENTS } from '$lib/links.js';
    export let data;
</script>

<div id="root">
    <h1> {data.announcement.title} </h1>
    <div id="announcement-body-container">
        {@html data.announcement.message}
    </div>
    <div class="buttons">
        <a href={ANNOUNCEMENTS}> Go Back </a>
    </div>
</div>

<style>
    #root {
        min-height: 100vh;
        min-height: 100svh;
        width: calc(min(50rem, 100vw));
        margin: 0 auto;
        padding: 1rem;
    }

    :global(#announcement-body-container p, #announcement-body-container div) {
        margin-top: 1rem;
    }

    .buttons {
        width: 100%;
        height: 5rem;
        display: grid;
        place-items: center;
        justify-items: start;
        margin-top: 2rem;
    }

    a {
        color: black;
        background: #c0c0c0;
        text-decoration: none;
        font-weight: 600;
        border-radius: 0.25rem;
        height: 2.5rem;
        width: 30%;
        font-size: 1.25rem;
        display: grid; 
        place-items: center;
    }
</style>