<script lang="ts">
    interface Hint {
        hint: string;
        before: boolean;
        guess: string;
        index: number;
    }

    import { bsGameHints } from '$lib/schema';
    export let data;
    const game = data.game;

    let availHints = bsGameHints(game).map((fullHint: string, index: number) => {
        const hint = fullHint.replace(game.target, '').trim();
        const before = fullHint.indexOf(game.target) < fullHint.indexOf(hint);
        return {
            hint,
            before,
            guess: "",
            index,
        }
    });
    let doneHints: Hint[] = [];
    let currentHint = availHints.shift()!;
    let indices = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8];

    const handleInput = (e: Event & { currentTarget: HTMLInputElement}) => {
        currentHint.guess = e.currentTarget.value;
        doneHints = [currentHint, ...doneHints];
        currentHint = availHints.shift()!;
    }
</script>

<div id="root">
    {#each indices as idx}
        {#if idx === -1}
            <div class="card full-width">
                <input on:change={handleInput} type="text" placeholder={currentHint.hint} />
            </div>
        {:else if (idx % 2) === 0}
            {#if idx / 2 < availHints.length}
                <div class="card">
                    <p> Hint #{availHints[idx / 2].index + 1} </p>
                </div>
            {:else}
                <div />
            {/if}
        {:else}
            {#if idx / 2 < doneHints.length}
                <div class="card">
                    <p> {doneHints[idx / 2].hint}: {doneHints[idx / 2].guess} </p>
                </div>
            {:else}
                <div />
            {/if}
        {/if}
    {/each}
</div>

<style>
    #root {
        height: 80vh;
        display: grid;
        grid-template-rows: repeat(5, 1fr);
        grid-template-columns: 1fr 1fr;
        overflow: hidden;
        place-items: center;
    }

    .card {
        background: lightgrey;
        margin: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid black;
        display: grid;
        place-items: center;
        width: 40vw;
        height: 80%;
    }

    .full-width {
        grid-column: span 2;
    }
</style>