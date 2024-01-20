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

    let currentHint = 0;
    const handleInput = (e: Event & { currentTarget: HTMLInputElement }) => {
        currentHint += 1;
    }
    let reveal = true;
    let showHint = [false, false, false, false, false];
</script>

<div id="root">
    <div>
    </div>
    <div class="card-container">
        {#each availHints as { hint }, idx}
            <div 
                class="card"
                class:away={currentHint < idx}
                class:revealed={idx <= currentHint && reveal}
                class:current={currentHint === idx}
                class:hint-shown={showHint[idx]}
            >
                <div class="hint-side">
                    <button on:click={() => showHint[idx] = false}> Show Back </button>
                </div>
                <div class="back-side">
                    <button on:click={() => showHint[idx] = true}> Show Hint </button>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    #root {
        height: 100vh;
        display: grid;
        grid-template-rows: 5rem 10rem 1fr 1fr;
        overflow: hidden;
        place-items: stretch;
    }

    .card-container {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        position: relative;
    }

    .card {
        position: absolute;
        display: grid;
        align-items: start;
        justify-items: center;
        width: 90vw;
        margin: 0 5vw;
        height: 100%;
        transform-style: preserve-3d;
        transition: transform 1s;
    }

    .card.current {
        background: white;
    }

    .hint-side, .back-side {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border: 1px solid black;
        border-radius: 0.5rem;
        display: grid;
        transition: transform 500ms;
        place-items: center;
        z-index: 2;
    }

    .hint-side {
        transform: rotateX(180deg);
        background: white;
    }

    .back-side {
        transform: rotateX(0deg);
        background: #f0f0f0;
    }

    .hint-shown > .hint-side {
        transform: rotateX(0deg);
    }

    .hint-shown > .back-side {
        transform: rotateX(180deg);
    }

    .card.away {
        transform: translateX(100vw);
    }

    .card:nth-child(1) {
    }

    .card:nth-child(1).away {
        transform: translateX(100vw);
    }

    .card:nth-child(1).revealed {
        transition: transform 300ms;
        transform: translateY(-25%);
    }

    .card:nth-child(2) {
    }

    .card:nth-child(2).away {
        transform: translateY(10%) translateX(100vw);
    }

    .card:nth-child(2).revealed {
        transition: transform 300ms;
        transform: translateY(0%);
    }

    .card:nth-child(3) {
    }

    .card:nth-child(3).away {
        transform: translateY(20%) translateX(100vw);
    }

    .card:nth-child(3).revealed {
        transition: transform 300ms;
        transform: translateY(25%);
    }

    .card:nth-child(4) {
    }

    .card:nth-child(4).away {
        transform: translateY(30%) translateX(100vw);
    }

    .card:nth-child(4).revealed {
        transition: transform 300ms;
        transform: translateY(50%);
    }

    .card:nth-child(5) {
    }

    .card:nth-child(5).away {
        transform: translateY(40%) translateX(100vw);
    }

    .card:nth-child(5).revealed {
        transition: transform 300ms;
        transform: translateY(75%);
    }
</style>