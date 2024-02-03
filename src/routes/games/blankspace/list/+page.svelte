<script lang="ts">
    import Fa from "svelte-fa";
    import { faPlay } from "@fortawesome/free-solid-svg-icons";
    import GameList from "./GameList.svelte";
    export let data;

    let wantList: boolean = true;

</script>

<div id="root">
    {#if wantList}
        <GameList games={data.games} progs={data.progs} />
    {:else}
        <button> <Fa icon={faPlay} size="3x" /> </button>
        <button> View all unplayed games </button>
        <button class="home"> Go back home </button>
    {/if}
</div>

<style>
    #root {
        background: white;
        min-height: 100vh;
        justify-content: space-between;
        align-items: center;
        flex-flow: column nowrap;
        padding: 1rem;
    }

    button {
        margin: 1rem;
        font-size: 1.25rem;
        border: none;
        background: black;
        color: white;
        border-radius: 0.25rem;
        padding: 1rem;
        display: grid;
        place-items: center;
        border-radius: 1rem;
    }

    .home {
        font-size: 1rem;
    }
</style>