<script lang="ts">
    import LikeBar from './LikeBar.svelte';
    import Fa from 'svelte-fa';
    import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
    import ExpandedTab from './ExpandedTab.svelte';

    export let data;
    let expandedIndices: number[] = [];
</script>

<div id="root">
    <div class="list">
        <div class="list-row header">
            <span> No. </span>
            <span> Target </span>
            <span> Rating </span>
            <span />
            <span />
            <span />
        </div>
        {#each data.infos as info, idx}
            <button class="list-row" on:mousedown={() => {
                if (expandedIndices.includes(idx)) {
                    expandedIndices = expandedIndices.filter((i) => i !== idx);
                } else {
                    expandedIndices = [idx, ...expandedIndices];
                }
            }}>
                <span>
                    {info.game.name.padStart(3, '0')}
                </span>
                <span>
                    <b><em>{info.game.target}</em></b>
                </span>
                <span class="thumb">
                    <span> <Fa icon={faThumbsDown} /> </span>
                    <span class="nlabel"> {info.thumbsDown} </span>
                </span>
                <span style="height: 0.25rem; width: 100%;">
                    <LikeBar 
                        left={info.feedbacks.filter((fb) => fb.thumbs).length} 
                        right={info.feedbacks.filter((fb) => !fb.thumbs).length} 
                    />
                </span>
                <span />
                <span class="thumb">
                    <span> <Fa icon={faThumbsUp} /> </span>
                    <span class="nlabel"> {info.thumbsUp} </span>
                </span>
            </button>
            {#if expandedIndices.includes(idx)}
                <ExpandedTab {info} userId={data.pbUser?.id ?? ""}/>
            {/if}
        {/each}
    </div>
</div>

<style>
    #root {
        width: 100vw;
        min-height: 100vh;
        background: #bbb;
        padding-bottom: 20rem;
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
        border: none;
        padding: 1rem 0.5rem;
        display: grid;
        align-items: center;
        justify-items: start;
        grid-template-columns: 3rem 1fr 2rem 1fr 0.5rem 2rem;
    }

    .list-row.header {
        position: sticky;
        align-self: start;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #eee;
        z-index: 1;
    }

    .thumb {
        display: grid;
        place-self: center;
        place-items: center;
        width: 100%;
        height: 100%;
        grid-template-columns: 1fr 1fr;
    }
    .thumb .nlabel {
        font-size: 0.8rem;
    }
</style>