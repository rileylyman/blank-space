<script lang="ts">
    import { tick } from 'svelte';
    import StartScreen from './StartScreen.svelte';

    interface Hint {
        value: string;
        targetBefore: boolean;
        targetHintGap: number;
        guess: string;
        expanded: boolean;
        completed: boolean;
        inputting: boolean;
    }

    enum GameMode {
        Easy,
        Medium,
        Hard,
    }
    let gameMode = GameMode.Easy;

    export let data;
    let useAutoClick = true;
    let easyMode = false;
    let rulesRead = false;
    let won = false;
    let targetWord = data.found ? data!.game!.target.toLowerCase().trim() : "";
    let rawHints = !data.found ? [] : [
        data!.game!.hint1.toLowerCase(), 
        data!.game!.hint2.toLowerCase(),
        data!.game!.hint3.toLowerCase(),
        data!.game!.hint4.toLowerCase(),
    ];
    let homeLink = "/games";
    const autoClickDelay = 750;
    $: hints = rawHints.map((raw) => { 
        const value = raw.replace(targetWord, '').trim();
        const hintLoc = raw.indexOf(value); 
        const targetLoc = raw.indexOf(targetWord); // TODO: check if target is actually in
        const targetBefore = targetLoc < hintLoc;
        const targetHintGap = targetBefore 
            ? hintLoc - (targetLoc + targetWord.length)
            : targetLoc - (hintLoc + value.length);
        return {
            value,
            targetBefore,
            targetHintGap,
            guess: "", 
            expanded: false, 
            completed: false, 
            inputting: false
        }
    });
    $: formattedHints = rawHints.map((raw, i) => 
        raw.toUpperCase()
            .replace(targetWord.toUpperCase(), `<b>${targetWord.toUpperCase()}</b>`)
    );
    $: targetPlaceholder = "*".repeat(targetWord.length);
    $: guesses = hints.map((hint) => hint.guess);
    $: remainingHints = hints.filter((hint) => !hint.guess);
    $: currentHint = hints.findIndex((hint) => !hint.completed);
    $: anyExpanded = hints.some((hint) => hint.expanded && !hint.completed);
    $: won = guesses.some((guess) => isCorrect(guess));
    $: gameOver = hints.every(({completed}) => completed) || won;
    $: tlen = targetWord.length;
    $: if (rulesRead) autoClick();

    const autoClick = () => { if (!gameOver && useAutoClick) setTimeout(() => hintClicked(currentHint)(), autoClickDelay) };

    const hintClicked = (hintIdx: number) => () => {
        if (currentHint < 0 || currentHint < hintIdx || hints[hintIdx].completed) {
            return;
        }
        hints[hintIdx].expanded = true;
    };

    const hintDone = (hintIdx: number, guess = "<no guess>") => {
        hints[hintIdx].completed = true;
        hints[hintIdx].guess = guess; 
        tick().then(autoClick);
    }

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

{#if data.found}
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
                            <div 
                                class="previous" 
                                class:show={hints[hintIdx].expanded && !hints[hintIdx].completed}
                                class:force-hide={hints[hintIdx].completed}
                            >
                                {#each hints as prevHint, prevHintIdx}
                                    {#if prevHintIdx < hintIdx}
                                        <p>
                                            <span class="previous-value">{prevHint.value}</span>: 
                                            <span class="guess strike">{prevHint.guess}</span>
                                        </p>
                                    {/if}
                                {/each}
                            </div>
                            <div class="hint-number">
                                #{hintIdx + 1}
                            </div>
                            <div class="hint-value">
                                {#if hint.targetBefore && hint.guess}
                                    <span class="guess">{hint.guess}</span>
                                {:else if hint.targetBefore && hint.expanded && !hint.completed}
                                    <input 
                                        autofocus
                                        style={`width: ${tlen}ch`}
                                        on:change={(e) => hintDone(hintIdx, e.target.value)}
                                        maxlength={targetWord.length}
                                        class="hint-inline-input"
                                        placeholder={targetPlaceholder}
                                        type="text" 
                                    />
                                {/if}
                                    <span class="value">
                                    {
                                        (hint.targetBefore ? ' '.repeat(hint.targetHintGap) : '')
                                        + hint.value + 
                                        (!hint.targetBefore ? ' '.repeat(hint.targetHintGap) : '')
                                    }
                                    </span>
                                {#if !hint.targetBefore && hint.guess}
                                    <span class="guess">{hint.guess}</span>
                                {:else if !hint.targetBefore && hint.expanded && !hint.completed}
                                    <input 
                                        autofocus
                                        style={`width: ${tlen}ch`}
                                        on:change={(e) => hintDone(hintIdx, e.target.value)}
                                        maxlength={targetWord.length}
                                        class="hint-inline-input"
                                        placeholder={targetPlaceholder}
                                        type="text" 
                                    />
                                {/if}
                            </div>
                        </div>
                        <div class="front">
                            <h3>Hint #{hintIdx + 1}</h3>
                        </div>
                    </button>
                {/each}
            </div>
        <div id="modal-container" class:hidden={rulesRead && !gameOver} class:strike={false}>
            {#if !rulesRead}
                <StartScreen on:play={() => rulesRead = true}/>
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
                    <a href={homeLink}>Go Home</a>
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
                    <a href={homeLink}>Go Home</a>
                </div>
            {/if}
        </div>
    </div>
{:else}
    <h1> Game not found </h1>
{/if}

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
        overflow-y: auto;
    }

    @media (max-aspect-ratio: 1/1.5) {
        #modal-container {
            background: white;
        }

        #modal {
            width: auto;
            border: none;
            padding: 0 1rem;
        }
    }

    #modal-container.hidden {
        opacity: 0;
        pointer-events: none;
    }

    #modal > h1 {
        font-size: 3rem;
    }

    #modal > .buttons {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 3rem;
    }

    #modal a, #modal button {
        display: block;
        width: 25%;
        margin: 0 1rem 0 1rem;
        text-align: center;
        background: white;
        border: 1px solid black;
        border-radius: 0.5rem;
        font-size: 1.5rem;
        color: black;
        text-decoration: none;
    }

    #modal a:hover, #modal button:hover {
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
        font-size: 2rem;
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
        opacity: 0;
        transition: opacity 2s;
        transition-delay: 1.5s;
    }

    .previous.show {
        opacity: 1;
    }

    .previous.force-hide {
        opacity: 0;
        transition: none;
    }

    .previous .hint-value {
        font-weight: bold;
    }

    .previous .guess {
        font-size: 1.5rem;
        font-style: italic;
        text-transform: lowercase;
    }

    .hint-number {
        position: absolute;
        right: 0;
        top: 0;
        margin: 1rem;
        font-size: 2rem;
    }

    .strike {
        text-decoration: line-through;
    }

    .back .hint-value {
        font-size: 2rem;
        display: flex;
        justify-content: center;
        font-family: 'Source Code Pro', 'Fira Sans', sans-serif;
    }

    .back .hint-value .value {
        font-size: 2rem;
        font-weight: bold;
        align-self: center;
        /* https://www.mattstobbs.com/flexbox-removing-trailing-whitespace */
        white-space: pre-wrap;
    }

    .back .hint-value .guess {
        font-size: 2rem;
        align-self: center;
        text-decoration: line-through;
    }

    .back .hint-inline-input {
        font-size: 2rem;
        padding: 0;
        align-self: center;
        outline: none;
        border: none;
        display: inline;
        text-transform: uppercase;
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

    .back .buttons input, .back .buttons input:focus {
        border: 1px solid black;
        border-radius: 0.5rem;
        height: 4rem;
        text-align: center;
        text-transform: lowercase;
    }

    .back .buttons input:focus {
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