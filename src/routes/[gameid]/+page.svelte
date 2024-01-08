<script lang="ts">
    interface Hint {
        value: string;
        guess: string;
        expanded: boolean;
        completed: boolean;
        inputting: boolean;
    }

    export let data;
    let rulesRead = false;
    let won = false;
    let targetWord = data.found ? data!.game!.target.toLowerCase().trim() : "";
    let rawHints = !data.found ? [] : [
        data!.game!.hint1, 
        data!.game!.hint2,
        data!.game!.hint3,
        data!.game!.hint4,
    ];
    let hints: Hint[] = rawHints.map((raw) => { 
        return {
            value: raw.toLowerCase().replace(targetWord, '').trim(), 
            guess: "", 
            expanded: false, 
            completed: false, 
            inputting: false
        }
    });
    $: formattedHints = rawHints.map((raw, i) => 
        raw.toUpperCase()
            .replace(targetWord.toUpperCase(), `<em><b>${targetWord.toUpperCase()}</b></em>`)
    );
    $: guesses = hints.map((hint) => hint.guess);
    $: remainingHints = hints.filter((hint) => !hint.guess);
    $: currentHint = hints.findIndex((hint) => !hint.completed);
    $: anyExpanded = hints.some((hint) => hint.expanded && !hint.completed);
    $: won = guesses.some((guess) => isCorrect(guess));
    $: gameOver = hints.every(({completed}) => completed) || won;

    const hintClicked = (hintIdx: number) => () => {
        if (hints[hintIdx].completed || currentHint < hintIdx) {
            return;
        }
        hints[hintIdx].expanded = true;
    };

    const isCorrect = (guess: string) => guess.toLowerCase() == targetWord.toLowerCase();

    const hintString = (hintIdx: number) => {
        if (hintIdx == 1) return "after the first hint. A perfect game!";
        if (hintIdx == 2) return "after the second hint. Stellar!"
        if (hintIdx == 3) return "after the third hint. Nice."
        if (hintIdx == 4 || hintIdx == -1) return "after the fourth hint. Hey, at least you didn't lose."
    };

    const scoreString = (hintIdx: number) => {
        if (hintIdx == 1) return ", a perfect 4-star score!"
        if (hintIdx == 2) return " for a cool 3 stars."
        if (hintIdx == 3) return " for a respectable 2 stars."
        if (hintIdx == 4 || hintIdx == -1) return " and earned 1 star."
    }
</script>

<div id="root-container">
        <div class="hints" 
            class:any-expand={anyExpanded}
            class:expand-1={hints[0].expanded && !hints[0].completed}
            class:retract-1={hints[0].completed && !hints[1].expanded}
            class:expand-2={hints[1].expanded && !hints[1].completed}
            class:retract-2={hints[1].completed && !hints[2].expanded}
            class:expand-3={hints[2].expanded && !hints[2].completed}
            class:retract-3={hints[2].completed && !hints[3].expanded}
            class:expand-4={hints[3].expanded && !hints[3].completed}
            class:retract-4={hints[3].completed}
        >
            {#each hints as hint, hintIdx}
                <button 
                    class="hint" 
                    class:revealed={hint.expanded}
                    class:fade-away={anyExpanded && (!hint.expanded || hint.completed)}
                    on:click={hintClicked(hintIdx)}
                >
                    <div class="back">
                        {#if !hint.completed}
                            <div class="previous">
                                {#each hints as prevHint, prevHintIdx}
                                    {#if prevHintIdx < hintIdx}
                                        <p>
                                            <span class="hint-value">{prevHint.value}</span>: 
                                            <span class="guess strike">{prevHint.guess}</span>
                                        </p>
                                    {/if}
                                {/each}
                            </div>
                        {/if}
                        <h1>{hint.value}</h1>
                        {#if hint.inputting && !hint.guess}
                            <div class="buttons">
                                <input 
                                    autofocus
                                    type=text 
                                    placeholder="enter your guess" 
                                    on:change={(e) => {hint.guess = e.target.value; hint.completed = true}}
                                >
                            </div>
                        {:else if !hint.completed}
                            <div class="buttons">
                                <button on:click={() => hint.inputting = true}>Guess</button>
                                <button on:click={() => {hint.completed = true; hint.guess = "<no guess>"}}>Next</button>
                            </div>
                        {/if}
                        {#if hint.guess}
                            <p class:correct={isCorrect(hint.guess)}>{hint.guess}</p>
                        {/if}
                    </div>
                    <div class="front">
                        <h3>{hintIdx == currentHint ? "Click to Reveal" : ""}</h3>
                    </div>
                </button>
            {/each}
        </div>
    <div id="modal-container" class:hidden={rulesRead && !gameOver} class:strike={false}>
        {#if !rulesRead}
            <div id="modal">
                <h1>
                    <b>Blank Space</b>
                </h1>
                <br/>
                <h2>
                    How to Play
                </h2>
                <br/>
                <p>
                    Your goal is to discover the elusive <em><b>TARGET WORD</b></em> using a
                    series of clues. Each clue can form a compound word or a
                    short phrase with the <em><b>TARGET WORD</b></em>.

                    <br/>
                    <br/>
                    
                    For instance, if the
                    <em><b>TARGET WORD</b></em> is "space," possible clues are "blank ____,"
                    "____ cadet," or "____-time continuum." It's important to
                    remember that the <em><b>TARGET WORD</b></em> will always be at the
                    beginning or end of the phrase, never in the middle.
                </p>
                <br/>
                <h2>
                    Scoring
                </h2>
                <br/>
                <p>
                    You score points based on how quickly you identify the
                    <em><b>TARGET WORD</b></em>. Guessing correctly on the first clue earns you 10
                    points, the second clue gets you 5 points, the third 3 points,
                    and the fourth 1 point.
                </p>

                <br/>
                <button on:click={() => rulesRead = true}>Play</button>
            </div>
        {:else if gameOver && !won}
            <div id="modal">
                <h1>You Lost</h1>
                <br/>
                <p>The correct word was <em><b>{targetWord.toUpperCase()}</b></em>. </p>
                <br />
                <h2>Hints </h2>
                <ul>
                {#each formattedHints as hint}
                    <li> 
                        {@html hint}
                    </li>
                {/each}
                </ul>
                <br/>
                <h2>Your Guesses </h2>
                <ul>
                {#each guesses as guess}
                    {#if guess}
                        <li> 
                            {guess.toUpperCase()}
                        </li>
                    {/if}
                {/each}
                </ul>
                <br/>
                <button on:click={() => window.location = window.location.pathname}>Go Home</button>
            </div>
        {:else if gameOver}
            <div id="modal">
                <h1>You Won!</h1>
                <br/>
                <p>You guessed <em><b>{targetWord.toUpperCase()}</b></em> {hintString(currentHint)}</p>
                <br />
                <h2> Points </h2>
                <br/>
                <p>
                    You left {remainingHints.length} hints remaining{scoreString(currentHint)}
                </p>
                <br/>
                <h2>Hints </h2>
                <ul>
                {#each formattedHints as hint}
                    <li> 
                        {@html hint}
                    </li>
                {/each}
                </ul>
                <br/>
                <h2>Your Guesses </h2>
                <ul>
                {#each guesses as guess}
                    {#if guess}
                        <li> 
                            {guess.toUpperCase()}
                        </li>
                    {/if}
                {/each}
                </ul>
                <br/>
                <button on:click={() => window.location = window.location.pathname}>Go Home</button>
            </div>
        {/if}
    </div>
</div>

<style>
    :root {
        font-family: 'Fira Sans', sans-serif;
    }

    #root-container {
        position: relative;
        display: grid;
        justify-items: center;
        align-items: center;
        height: 100vh;
        height: 100svh;
        max-height: 100vh;
        max-height: 100svh;
        filter: blur(100);
    }
    
    #modal-container {
        position: absolute;
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        background: #ffffffcf;
        transition: opacity 0ms;
    }

    #modal {
        position: absolute;
        background: white;
        border: 1px solid black;
        border-radius: 0.5rem;
        width: 70%;
        max-height: 90%;
        padding: 3rem 4rem;
        overflow: scroll;
    }

    @media (max-aspect-ratio: 1/1.5) {
        #modal {
            border: none;
            width: 100%;
            height: 100%;
            max-height: 100%;
            padding: 1rem 2rem;
        }
    }

    #modal-container.hidden {
        opacity: 0;
        pointer-events: none;
    }

    #modal > h1 {
        font-size: 3rem;
    }

    #modal > button {
        display: block;
        margin: 3rem auto 0 auto;
        width: 10rem;
        text-align: center;
        background: white;
        border: 1px solid black;
        border-radius: 0.5rem;
        font-size: 1.5rem;
    }

    #modal > button:hover {
        background: #f0f0f0;
        cursor: pointer;
    }

    .hints {
        display: grid;
        grid-template: 1fr 1fr / 1fr 1fr;
        grid-auto-flow: dense;
        justify-items: center;
        align-items: center;
        column-gap: 2.5vw;
        row-gap: 2.5vw;
        width: 90vw;
        max-width: 1500px;
        height: 65%;
    }

    .hints.any-expand {
    }

    .hints.expand-1 {
        animation: resize-1 500ms ease 1000ms forwards;
    }

    .hints.expand-2 {
        animation: resize-2 500ms ease 1000ms forwards;
    }

    .hints.expand-3 {
        animation: resize-3 500ms ease 1000ms forwards;
    }

    .hints.expand-4 {
        animation: resize-4 500ms ease 1000ms forwards;
    }

    .hints.retract-1 {
        grid-template: 1fr 0fr / 1fr 0fr;
        animation: resize-1-back 500ms ease 0ms forwards;
    }

    .hints.retract-2 {
        grid-template: 1fr 0fr / 0fr 1fr;
        animation: resize-2-back 500ms ease 0ms forwards;
    }

    .hints.retract-3 {
        grid-template: 0fr 1fr / 1fr 0fr;
        animation: resize-3-back 500ms ease 0ms forwards;
    }

    .hints.retract-4 {
        grid-template: 0fr 1fr / 0fr 1fr;
        animation: resize-4-back 500ms ease 0ms forwards;
    }

    @keyframes resize-1 {
        0% {
            grid-template: 1fr 1fr / 1fr 1fr;

        }
        100% {
            grid-template: 1fr 0fr / 1fr 0fr;
        }
    }

    @keyframes resize-2 {
        0% {
            grid-template: 1fr 1fr / 1fr 1fr;

        }
        100% {
            grid-template: 1fr 0fr / 0fr 1fr;
        }
    }

    @keyframes resize-3 {
        0% {
            grid-template: 1fr 1fr / 1fr 1fr;

        }
        100% {
            grid-template: 0fr 1fr / 1fr 0fr;
        }
    }

    @keyframes resize-4 {
        0% {
            grid-template: 1fr 1fr / 1fr 1fr;

        }
        100% {
            grid-template: 0fr 1fr / 0fr 1fr;
        }
    }

    @keyframes resize-1-back {
        0% {
            grid-template: 1fr 0fr / 1fr 0fr;
        }
        100% {
            grid-template: 1fr 1fr / 1fr 1fr;

        }
    }

    @keyframes resize-2-back {
        0% {
            grid-template: 1fr 0fr / 0fr 1fr;
        }
        100% {
            grid-template: 1fr 1fr / 1fr 1fr;

        }
    }

    @keyframes resize-3-back {
        0% {
            grid-template: 0fr 1fr / 1fr 0fr;
        }
        100% {
            grid-template: 1fr 1fr / 1fr 1fr;

        }
    }

    @keyframes resize-4-back {
        0% {
            grid-template: 0fr 1fr / 0fr 1fr;
        }
        100% {
            grid-template: 1fr 1fr / 1fr 1fr;

        }
    }

    @media (max-aspect-ratio: 1/1.2) {
        .hints {
            height: 80%;
            grid-template: 1fr 1fr 1fr 1fr / 1fr;
            column-gap: 1rem;
            row-gap: 1rem;
        }
    }

    .hint {
        all: unset;
        display: block;
        font-size: max(2vh, 2vw, 1rem);
        text-transform: uppercase;
        position: relative;
        text-align: center;
        justify-self: stretch;
        align-self: stretch;
        transition: opacity 1000ms;
    }

    .hint:hover {
        cursor: pointer;
    }

    .hint.fade-away {
        opacity: 0;
    }

    .back, .front {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
        border: 1px solid black;
        border-radius: 1rem;
        transition: transform 1000ms;
        transform-style: preserve-3d;
        backface-visibility: hidden;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: space-around;
    }

    .front {
        background-color: #f0f0f0;
    }

    .front > h1, .back > h1 {
        font-size: 1.5em;
    }

    .back > .previous {
        position: absolute;
        top: 0;
        left: 0;
        padding: 1rem 2rem;
        text-align: left;
    }

    .previous .hint-value {
        font-weight: bold;
    }

    .previous .guess {
        font-size: 1.5rem;
        font-style: italic;
        text-transform: lowercase;
    }

    .strike {
        text-decoration: line-through;
    }

    .back > p {
        text-decoration: line-through;
        text-transform: lowercase;
        font-style: italic;
    }

    .back > p.correct {
        text-decoration: none;
    }

    .back > .buttons {
        width: 100%;
    }

    .back > .buttons > button {
        width: 10rem;
        text-transform: uppercase;
        background: white;
        border: 1px solid black;
        border-radius: 0.5rem;
    }

    .back > .buttons > button:hover {
        background: #f0f0f0;
        cursor: pointer;
    }

    .back input, .back input:focus {
        border: 1px solid black;
        border-radius: 0.5rem;
        height: 4rem;
        text-align: center;
        text-transform: lowercase;
    }

    .back input:focus {
        outline: none;
    }


    .front:hover {
        box-shadow: -2px 2px 15px #d9d9d2;
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