<script lang="ts">

    interface Hint {
        revealed: boolean;
        cost: number;
        value: string;
    }

    let guess = "";
    let incorrectGuesses: string[] = [];
    let hints: Hint[] = [
        {revealed: false, cost: 3, value: "fire"}, 
        {revealed: false, cost: 1, value: "oyster"}, 
        {revealed: false, cost: 10, value: "ritz"}, 
        {revealed: false, cost: 7, value: "nut"}];
    let target: string = "cracker";

    let correctGuess: boolean = false;

    const revealHint = (hintIdx: number) => () => {
        hints[hintIdx].revealed = true;
    };

    $: console.log(guess);

    let placeholder = "Enter your guess";
    
    const submitGuess = () => {
        if (guess.toLowerCase() === target.toLowerCase()) {
            correctGuess = true;
        } else {
            incorrectGuesses = [...incorrectGuesses, guess];
            console.log(incorrectGuesses);
            placeholder = "incorrect";
            guess = "";
        }
    };
</script>

<div id="root-container">
    <div id="settings"> settings </div>
    <div id="header"> Blank Space </div>
    <div id="help"> help </div>
    <div/>
    <input 
        class:correct-guess={correctGuess} 
        type="text" 
        bind:value={guess} 
        on:change={submitGuess} 
        disabled={correctGuess}
        placeholder={placeholder}
        />
    <div/>
    <div/>
    <div id="score"> <p class="score-label">Score:</p> 25 </div>
    <div/>
    <div/>
    <p id="hint-help">Click a hint to reveal</p>
    <div/>
    {#each hints as {revealed, cost, value}, hintIdx}
        {#if ((hintIdx % 2) == 0)}
            <div/>
        {/if}
        <div class="hint" class:revealed on:click={revealHint(hintIdx)}>
            <div class="back">{value}</div>
            <div class="front">-{cost} point{cost > 1 ? 's' : ''}</div>
        </div>
        {#if ((hintIdx %2) == 1)}
            <div/>
        {/if}
    {/each}
    <div/>
    <p id="hint-help">Incorrect guesses:</p>
    <div/>
    <div/>
    <div id="incorrect-guesses">
        {#each incorrectGuesses as g}
            <p>{g}</p>
        {/each}
    </div>
    <div/>
</div>

<style>
    #root-container {
        margin-top: 1.5rem;
        display: grid;
        grid-template-columns: 1fr 2fr 2fr 1fr;
        justify-items: center;
        align-items: center;
        column-gap: 1rem;
        row-gap: 1rem;
        font-family: 'Verdana';
        width: 100vw;
    }

    #hint-help {
        font-size: 1.3rem;
        grid-column: span 2;

    }

    #header {
        grid-column: span 2;
        font-size: 5rem;
        text-decoration: underline overline;
    }
    
    input {
        all: unset;
        grid-column: span 2;
        text-transform: uppercase;
        margin: 2rem 0 2rem 0;
        width: 80%;
        height: 4rem;
        text-align: center;
        border-radius: 0.5rem;
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

    #score {
        position: relative;
        grid-column: span 2;
        font-size: 5rem;
        background: lightgrey;
        border-radius: 50%;
        width: 10rem;
        height: 10rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #score > .score-label {
        position: absolute;
        display: block;
        font-size: 1rem;
        top: 1rem;
    }

    .hint {
        font-size: 1.5em;
        text-transform: uppercase;
        position: relative;
        text-align: center;
        min-width: 100%;
        height: 10rem;
        justify-self: center;
    }

    .hint:hover {
        cursor: pointer;
    }

    .back, .front {
        border-radius: 0.5rem;
        overflow: hidden;
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

    #incorrect-guesses {
        grid-column: span 2;
        width: 80%;
        height: 20rem;
        border: 1px solid black;
        border-radius: 0.5rem;
        overflow-x: hidden;
        overflow-y: scroll;
        text-align: center;
        padding: 1rem;
        text-transform: uppercase;
    }

</style>