<script lang="ts">
    import LikeBar from './LikeBar.svelte';
    import Fa from 'svelte-fa';
    import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
    export let data;
</script>

<div id="root">
    <div class="list">
        {#each data.results as res}
            <div class="list-row">
                <span>
                    {res.game.name.padStart(3, '0')}
                </span>
                <span>
                    <b><em>{res.game.target}</em></b>
                </span>
                <span class="thumb">
                    <Fa icon={faThumbsDown} />
                </span>
                <span style="height: 0.25rem; width: 100%;">
                    <LikeBar 
                        left={res.feedbacks.filter((fb) => fb.thumbs).length} 
                        right={res.feedbacks.filter((fb) => !fb.thumbs).length} 
                    />
                </span>
                <span class="thumb">
                    <Fa icon={faThumbsUp} />
                </span>
            </div>
        {/each}
    </div>
</div>

<style>
    #root {
        width: 100vw;
        background: white;
    }

    .list {
        width: 100%;
        display: grid;
        place-items: stretch;
        row-gap: 0.25rem;
        background: #bbb;
    }

    .list-row {
        background: white;
        padding: 1rem 0.5rem;
        display: grid;
        align-items: center;
        justify-items: start;
        grid-template-columns: 3rem 1fr 2rem 1fr 2rem;
    }

    .thumb {
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
    }
</style>