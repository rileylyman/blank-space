<script lang="ts">
    import LikeBar from './LikeBar.svelte';
    import Fa from 'svelte-fa';
    import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
    import GuessTable from '$lib/ui/GuessTable.svelte';
    import BarPlot from '$lib/ui/BarPlot.svelte';
    import { bsGameHints } from '$lib/schema';
    export let data;

    let expandedIdx: number | null = null;
    let bars: Map<string, number> = new Map();
    $: {
        if (expandedIdx !== null) {
            bars = new Map();
            data.results[expandedIdx].feedbacks.forEach((fb) => {
                fb.tags.split(",").forEach((tag) => {
                    if (tag) {
                        bars.set(tag, bars.get(tag) ?? 0 + 1);
                    }
                })
            });
            console.log(bars);
        }
    }
</script>

<div id="root">
    <div class="list">
        {#each data.results as res, idx}
            <button class="list-row" on:mousedown={(e) => {
                expandedIdx = expandedIdx === idx ? null : idx;
            }}>
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
            </button>
            {#if expandedIdx === idx}
                <div class="expanded">
                    <h2> Your Guesses </h2>
                    <GuessTable target={res.game.target} guesses={res.prog.guesses.split(",")} fullHints={bsGameHints(res.game)} />
                    <h2> Tags </h2>
                    <div class="bar-plot-container">
                        <BarPlot {bars} />
                    </div>
                </div>
            {/if}
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
        border: none;
        padding: 1rem 0.5rem;
        display: grid;
        align-items: center;
        justify-items: start;
        grid-template-columns: 3rem 1fr 2rem 1fr 2rem;
    }

    .expanded {
        margin-top: -0.25rem;
        background: white;
        display: grid;
        padding: 1rem;
        place-items: stretch;
    }

    .expanded h2 {
        font-size: 1rem;
    }

    .bar-plot-container {
        padding: 1rem;
        border: 1px solid black;
    }

    .thumb {
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
    }
</style>