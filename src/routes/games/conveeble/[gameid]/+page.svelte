<script lang="ts">
    import VirtualKeyboard from '$lib/ui/VirtualKeyboard.svelte';

    let currWord = "";
    let letters = "abcdefghijklmnopqrstuvwxyz";
    letters = `  ${letters}`;
    const windowSize = 6;
    const extraSize = 2;
    $: viewSize = windowSize + extraSize * 2;
    let viewStart = 0; 
    const incrementWindow = () => {
        viewStart += 1;
        if (viewStart + extraSize + windowSize - 1 >= letters.length) {
            viewStart = 0;
        }
    }
    $: inView = letters.substring(viewStart, viewStart + viewSize);
    $: inWindow = letters.substring(viewStart + extraSize, viewStart + extraSize + windowSize);
    $: disabledKeys = "abcdefghijklmnopqrstuvwxyz".split("").filter((v) => !inWindow.includes(v)).join()

    const handleKeypress = ({ detail: { key, del, enter }}: { detail: { key: string, del: boolean, enter: boolean }}) => {
        if (del) {
            currWord = currWord.substring(0, currWord.length - 1);
        } else if (enter) {
            incrementWindow();
            currWord = "";
        } else {
            currWord += key;
        }
    }
</script>

<div id="root">
    <div class="timer"> 
        1:39
    </div>
    <div class="curr-word"> 
        {currWord}
    </div>
    <div class="belt"> 
        {#each inView as letter, idx}
            <p
                class:in-window={idx >= extraSize && idx < viewSize - extraSize}
            >
                {letter}
            </p>
        {/each}
    </div>
    <div class="keyboard"> 
        <VirtualKeyboard on:keypress={handleKeypress} {disabledKeys} enterDisabled={false} error={""} />
    </div>
</div>

<style>
    .belt {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        place-items: center;
        width: 100%;
        height: 100%;
        column-gap: 4px;
        background: #ccc;
        border: 2px solid black;
        border-left: none;
        border-right: none;
    }

    .belt p {
        width: 100%;
        display: block;
        aspect-ratio: 1 / 1.5;
        display: grid;
        place-items: center;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 1.5rem;
        border-radius: 0.5rem;
    }

    .belt .in-window {
        background: #eee;
        border: 1px solid black;
        font-size: 1.75rem;
    }

    #root {
        width: 100vw;
        height: 100vh;
        height: 100svh;
        display: grid;
        place-items: center;
        grid-template-rows: 7rem 7rem 10rem 1fr;
    }

    .timer {
        font-size: 2rem;
        font-weight: 300;
        align-self: end;
    }

    .curr-word {
        text-transform: uppercase;
        font-size: 2.5rem;
        font-weight: 500;
        margin-bottom: 1rem;
    }

    .keyboard {
        width: 100%;
        align-self: end;
        margin-bottom: 1rem;
    }
</style>