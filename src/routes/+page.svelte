<script lang="ts">

    interface Hint {
        revealed: boolean;
        value: string;
    }

    let guess = "";
    let hints: Hint[] = [
        {revealed: false, value: "fire"}, 
        {revealed: false, value: "oyster"}, 
        {revealed: false, value: "ritz"}, 
        {revealed: false, value: "nut"}];
    let target: string = "cracker";

    let correctGuess: boolean = false;

    const revealHint = (hintIdx: number) => () => {
        hints[hintIdx].revealed = true;
    };

    $: console.log(guess);

    let placeholder = "Enter your text here.";
    
    const submitGuess = () => {
        if (guess.toLowerCase() === target.toLowerCase()) {
            correctGuess = true;
        } else {
            placeholder = "incorrect guess";
            guess = "";
        }
    };
</script>

<div id="root-container">
    <input 
        class:correct-guess={correctGuess} 
        type="text" 
        bind:value={guess} 
        on:change={submitGuess} 
        disabled={correctGuess}
        placeholder={placeholder}
        />
    <div id="hints">
        {#each hints as {revealed, value}, hintIdx}
            <div class="hint" class:revealed on:click={revealHint(hintIdx)}>
                <div class="back">{value}</div>
                <div class="front"></div>
            </div>
        {/each}
    </div>
    <p id="hint-help">Click a hint to reveal</p>
</div>

<style>
    #root-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: 'Verdana';
        width: 100vw;
    }

    #hint-help {
        font-size: 1.5rem;
        margin-top: 5rem;
    }
    
    input {
        all: unset;
        text-transform: uppercase;
        margin: 5rem 0 5rem 0;
        width: 50%;
        height: 4rem;
        text-align: center;
        border-radius: 1rem;
        border: 1px solid black;
        font-size: 1.5em;
    }
    
    input:disabled {
        color: black;
    }
    
    input:focus {
        box-shadow: -3px 3px 15px grey;
    }

    input.correct-guess {
        background: #3c9252;
        color: black;
    }

    #hints {
        font-size: 1.5em;
        display: grid;
        column-gap: 1rem;
        row-gap: 1rem;
        grid-template-columns: 1fr 1fr;
        width: 80%;
    }

    .hint {
        text-transform: uppercase;
        position: relative;
        border-radius: 0.1rem;
        text-align: center;
        min-width: 100%;
        height: 25vh;
        justify-self: center;
    }

    .hint:hover {
        cursor: pointer;
    }

    .back, .front {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        position: absolute;
        height: 100%;
        width: 100%;
        transition: transform 1s;
        transform-style: preserve-3d;
        backface-visibility: hidden;
    }

    .front:hover {
        box-shadow: -2px 2px 20px gray;
    }

    .front {
        background-color: lightgrey;
    }

    .back {
        transform: rotateX(180deg);
    }

    .hint.revealed > .back {
        transform: rotateX(0);
    }
    .hint.revealed > .front {
        transform: rotateX(180deg);
    }

</style>