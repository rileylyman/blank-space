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
    <div id="header"> Blank Space </div>
    <input 
        class:correct-guess={correctGuess} 
        type="text" 
        bind:value={guess} 
        on:change={submitGuess} 
        disabled={correctGuess}
        placeholder={placeholder}
        />
    <div id="score"> <p class="score-label">Score:</p> 25 </div>
    <p id="hints-label">Click a hint to reveal:</p>
    <div class="hints">
        {#each hints as {revealed, cost, value}, hintIdx}
            <div class="hint" 
                class:hint-left={(hintIdx % 2) == 0} 
                class:hint-right={(hintIdx % 2) == 1} 
                class:revealed 
                on:click={revealHint(hintIdx)}
                >
                <div class="back">{value}</div>
                <div class="front">-{cost} point{cost > 1 ? 's' : ''}</div>
            </div>
        {/each}
    </div>
    <p id="incorrect-guesses-label">Incorrect guesses:</p>
    <div id="incorrect-guesses">
        {#each incorrectGuesses as g}
            <p>{g}</p>
        {/each}
    </div>
</div>

<style>
    #root-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 2fr 2fr 4rem 0.5fr 4fr 0.5fr 3fr;
        grid-template-areas: "header header"
              "score score"
              "guess guess"
              "hints-label hints-label"
              "hints hints"
              "incorrect-guesses-label incorrect-guesses-label"
              "incorrect-guesses incorrect-guesses";
        grid-auto-rows: min-content;
        grid-auto-flow: dense;
        justify-items: center;
        align-items: center;
        column-gap: 1rem;
        row-gap: 1rem;
        font-family: 'Verdana';
        width: 100vw;
        height: 100vh;
        width: 100svw;
        height: 100svh;
        padding-bottom: 2rem;
        padding-top: 0rem;
    }

    @media screen and (min-width: 900px) {
        #root-container {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr 4rem 0.5fr 1fr 1fr 1fr 1fr;
            grid-template-areas: "header header"
                "score score"
                "guess guess"
                "hints-label incorrect-guesses-label"
                "hints incorrect-guesses"
                "hints incorrect-guesses"
                "hints incorrect-guesses"
                "hints incorrect-guesses"
        }
    }

    #header {
        font-size: 12vw;
        text-decoration: underline overline;
        grid-area: header;
    }

    @media screen and (min-width: 640px) {
        #header {
            font-size: 5rem;
        }
    }
    
    input {
        all: unset;
        margin-top: 1rem;
        text-transform: uppercase;
        align-self: stretch;
        min-width: 50%;
        max-height: 3rem;
        text-align: center;
        border-radius: 0.5rem;
        border: 1px solid black;
        font-size: 1.5em;
        grid-area: guess;
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
        grid-area: score;
        font-size: 4rem;
        padding: 1rem;
        background: lightgrey;
        border-radius: 50%;
        align-self: stretch;
        height: 100%;
        aspect-ratio: 1 / 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @media screen and (min-width: 900px) {
        #score {
            font-size: 10vw;
        }

    }

    #score > .score-label {
        position: absolute;
        display: block;
        font-size: 0.8rem;
        top: 1rem;
    }

    #hints-label {
        font-size: 1rem;
        grid-area: hints-label;
        margin-bottom: -1rem;
    }

    .hints {
        min-height: 10rem;
        align-self: stretch;
        justify-self: stretch;
        grid-area: hints;
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 1rem;
        column-gap: 1rem;
        padding: 0 5% 0 5%;
    }

    @media screen and (min-width: 900px) {
        .hints {
            grid-template-columns: 1fr;
        }
    }

    .hint {
        font-size: min(2vh, 5vw);
        text-transform: uppercase;
        position: relative;
        text-align: center;
        align-self: stretch;
        justify-self: stretch;
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

    #incorrect-guesses-label {
        grid-area: incorrect-guesses-label;
        margin-bottom: -1rem;
    }

    #incorrect-guesses {
        grid-area: incorrect-guesses;
        width: 90%;
        align-self: stretch;
        border: 1px solid black;
        border-radius: 0.5rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow-x: hidden;
        overflow-y: scroll;
        text-align: center;
        padding: 1rem;
        text-transform: uppercase;
    }

</style>