<script lang="ts">
    import { bsGameLink } from '$lib/links.js';

    export let data;
</script>

<h1> Blank Space </h1>
<br/>
<h2> All Games </h2>
<ul>
    {#each data.games as game}
        <li><a href={bsGameLink(game.id)}>{game.name}</a></li>
    {/each}
</ul>

<style>
    :root {
        background-color: white;
    }
</style>