<script lang="ts">
    import { ANNOUNCEMENTS, BS_HOME_SKIP_MENU } from '$lib/links.js';
    import { onMount } from 'svelte';
    import { preloadData } from '$app/navigation';

    export let data;

    onMount(() => {
        preloadData(BS_HOME_SKIP_MENU);
    })

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dateString = (date: string) => {
        const d = new Date(date);
        return `${months[d.getMonth()]} ${d.getDate()}`;
    }
</script>

<div id="root" data-sveltekit-preload-data="off">
    <h1> Announcements </h1>
    <a class="home" href={BS_HOME_SKIP_MENU}> Go Home </a>
    <div class="links">
        {#each data.anns as { id, title, release_on }}
            <div class:read={data.read?.read.includes(id)}>
                <a href={ANNOUNCEMENTS + '/' + id}> {title} </a> <span> {dateString(release_on)} </span>
            </div>
        {/each}
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

    .links {
        margin-top: 2rem;
        display: grid;
    }

    .links div {
        background: #fafafa;
        border: 1px solid #ccc;
        border-top: none;
        padding: 0.5rem;
        display: grid;
        align-items: center;
        justify-items: start;
        grid-template-columns: 80% 20%;
    }

    .links div:first-child {
        border-top: 1px solid #ccc;
    }

    .links .read {
        background: #eee;
    }

    .links a {
        font-weight: 600;
        font-size: 1.25rem;
        color: black;
        text-decoration: none;
    }

    .links .read a {
        font-weight: 400;
    }

    .links span {
        font-size: 1.25rem;
    }
    
    a.home {
        color: blue;
    }
</style>