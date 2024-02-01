<script lang="ts">
    import GuessTable from '$lib/ui/GuessTable.svelte';
    import BarPlot from '$lib/ui/BarPlot.svelte';
    import TextMessages from '$lib/ui/TextMessages.svelte';
    import { bsGameHints } from '$lib/schema';
    import { type GameAllInfo } from './common';

    export let info: GameAllInfo;
    export let userId: string;

    let bars: Map<string, number> = new Map();
    let messages: Array<{msg: string, name: string, me: boolean}> = new Array();

    info.feedbacks.forEach((fb) => {
        fb.tags.split(",").forEach((tag) => {
            if (tag) {
                bars.set(tag, (bars.get(tag) ?? 0) + 1);
            }
        })
    });
    bars = new Map([...bars.entries()].sort((a, b) => a[1] - b[1]).reverse());

    info.feedbacks.forEach((fb) => {
        if (fb.feedback) {
            messages.push({ msg: fb.feedback, name: fb.expand?.user?.username ?? "", me: fb.user === userId });
        }
    });
</script>

<div id="root">
    <GuessTable target={info.game.target} guesses={info.prog?.guesses.split(",") ?? []} fullHints={bsGameHints(info.game)} />
    <br />
    <h2> Tags </h2>
    {#if bars.size}
        <div class="bar-plot-container">
            <BarPlot {bars} />
        </div>
    {:else}
        <p><em> No tags to show </em></p>
    {/if}
    <br />
    <h2> Feedback </h2>
    {#if messages.length}
        <div class="text-messages-container">
            <TextMessages {messages} />
        </div>
    {:else}
        <p><em> No messages to show</em></p>
    {/if}
</div>

<style>
    #root {
        margin-top: -0.25rem;
        background: white;
        display: grid;
        padding: 1rem;
        padding-top: 0.25rem;
        place-items: stretch;
    }

    h2 {
        font-size: 1rem;
    }

    .bar-plot-container {
        padding: 1rem;
        border: 1px solid black;
    }

    .text-messages-container {
        border: 1px solid black;
    }

</style>