<script lang="ts">
    export let data;
</script>

<h1> Blank Space </h1>
<br/>
<h2> All Games </h2>
<ul>
    {#each data.games as game}
        <li><a href={`/games/blankspace/${game.id}`}>{game.id}</a></li>
    {/each}
</ul>

<style>
    :root {
        background-color: white;
    }
</style>