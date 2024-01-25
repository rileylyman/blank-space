<script lang="ts">
    import { bsGameLink } from '$lib/links.js';

    export let data;

    $: wonGameIds = data.progs.filter(({ won }) => won).map(({ bs_game }) => bs_game);
    $: lostGameIds = data.progs.filter(({ lost }) => lost).map(({ bs_game }) => bs_game);
    $: inProgressGameIds = data.progs.filter(({ won, lost }) => !won && !lost).map(({ bs_game }) => bs_game);
    $: wonGames = data.games.filter(({ id }) => wonGameIds.includes(id));
    $: lostGames = data.games.filter(({ id }) => lostGameIds.includes(id));
    $: inProgressGames = data.games.filter(({ id }) => inProgressGameIds.includes(id));
    $: unplayedGames = data.games.filter(({ id }) => !wonGameIds.includes(id) && !lostGameIds.includes(id) && !inProgressGameIds.includes(id));
</script>

<div id="root">
    <h1> Blank Space </h1>
    <br/>
    {#if inProgressGames.length}
        <h2> In-Progress Games </h2>
        <ul>
            {#each inProgressGames as game}
                <li><a href={bsGameLink(game.id)}>{game.name}</a></li>
            {/each}
        </ul>
    {/if}
    {#if unplayedGames.length}
        <h2> Unplayed Games </h2>
        <ul>
            {#each unplayedGames as game}
                <li><a href={bsGameLink(game.id)}>{game.name}</a></li>
            {/each}
        </ul>
    {/if}
    {#if wonGames.length}
        <h2> Won Games </h2>
        <ul>
            {#each wonGames as game}
                <li><a href={bsGameLink(game.id)}>{game.name}</a></li>
            {/each}
        </ul>
    {/if}
    {#if lostGames.length}
        <h2> Lost Games </h2>
        <ul>
            {#each lostGames as game}
                <li><a href={bsGameLink(game.id)}>{game.name}</a></li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    #root {
        background-color: white;
        padding: 1rem;
    }
</style>