<script lang="ts">
    import { bsGameLink, bsGameLinkOld } from '$lib/links.js';

    export let data;
</script>

<h1> Blank Space </h1>
<br/>
<h2> All Games </h2>
<ul>
    {#each data.games as game}
        <li><a href={bsGameLinkOld(game.id)}>{game.id}</a> ---- <a href={bsGameLink(game.id)}> (see new wip screen) </a></li>
    {/each}
</ul>

<style>
    :root {
        background-color: white;
    }
</style>