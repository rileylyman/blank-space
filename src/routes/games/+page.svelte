<script lang="ts">
    interface Game {
        id: string;
    }

    export let data;
    let games: Game[] = data!.games!;

    const getLink = (game: Game) =>`/${game.id}`;

</script>

<h1> Blank Space </h1>
<br/>
<h2> All Games </h2>
<ul>
    {#each games as game}
        <li><a href={getLink(game)}>{game.id}</a></li>
    {/each}
</ul>