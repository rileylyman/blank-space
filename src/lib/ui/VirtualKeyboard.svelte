<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let enterDisabled: boolean;
    export let error: string;
    export let disabledKeys: string = "";
    $: disabledKeys = disabledKeys.toLocaleLowerCase();
    export let goodKeys: string = "";
    $: goodKeys = goodKeys.toLocaleLowerCase();

    let deleteButton: HTMLButtonElement | null = null;
    let enterButton: HTMLButtonElement | null = null;
    let shiftButton: HTMLButtonElement | null = null;

    const handleKeyClick = (e: Event & { currentTarget: HTMLButtonElement }) => {
        error = "";
        if (e.currentTarget === deleteButton) {
            dispatch('keypress', { enter: false, del: true, key: e.currentTarget.textContent });
        } else if (e.currentTarget === enterButton) {
            dispatch('keypress', { enter: true, del: false, key: e.currentTarget.textContent });
        } else if (e.currentTarget === shiftButton) {
            // do nothing
        } else {
            dispatch('keypress', { enter: false, del: false, key: e.currentTarget.textContent });
        }
    }

    const handleWindowKeyPress = (e: KeyboardEvent) => {
        if (!/^[a-zA-Z]$/.test(e.key) && e.key !== "Enter" && e.key !== "Backspace") {
            return;
        }
        error = "";
        if (e.key === "Backspace") {
            dispatch('keypress', { enter: false, del: true, key: e.key });
        } else if (e.key === "Enter") {
            dispatch('keypress', { enter: true, del: false, key: e.key });
        } else {
            dispatch('keypress', { enter: false, del: false, key: e.key });
        }
    }
</script>

<svelte:window on:keydown={handleWindowKeyPress} />

<div id="root">
    <div style="grid-column: span 4" />
    <button bind:this={enterButton} class:invalid={error} disabled={enterDisabled} on:click|preventDefault={handleKeyClick} value="ENTER" class="key ultrawide">
        { error ? error.toLocaleUpperCase() : 'ENTER YOUR GUESS'}
    </button>
    <div style="grid-column: span 4" />
    <button on:click|preventDefault={handleKeyClick} value="Q" class="key popup" class:disabled={disabledKeys.includes("q")} class:good={goodKeys.includes("q")}>
        Q
    </button>
    <button on:click|preventDefault={handleKeyClick} value="W" class="key popup" class:disabled={disabledKeys.includes("w")} class:good={goodKeys.includes("w")}>
        W
    </button>
    <button on:click|preventDefault={handleKeyClick} value="E" class="key popup" class:disabled={disabledKeys.includes("e")} class:good={goodKeys.includes("e")}>
        E
    </button>
    <button on:click|preventDefault={handleKeyClick} value="R" class="key popup" class:disabled={disabledKeys.includes("r")} class:good={goodKeys.includes("r")}>
        R
    </button>
    <button on:click|preventDefault={handleKeyClick} value="T" class="key popup" class:disabled={disabledKeys.includes("t")} class:good={goodKeys.includes("t")}>
        T
    </button>
    <button on:click|preventDefault={handleKeyClick} value="Y" class="key popup" class:disabled={disabledKeys.includes("y")} class:good={goodKeys.includes("y")}>
        Y
    </button>
    <button on:click|preventDefault={handleKeyClick} value="U" class="key popup" class:disabled={disabledKeys.includes("u")} class:good={goodKeys.includes("u")}>
        U
    </button>
    <button on:click|preventDefault={handleKeyClick} value="I" class="key popup" class:disabled={disabledKeys.includes("i")} class:good={goodKeys.includes("i")}>
        I
    </button>
    <button on:click|preventDefault={handleKeyClick} value="O" class="key popup" class:disabled={disabledKeys.includes("o")} class:good={goodKeys.includes("o")}>
        O
    </button>
    <button on:click|preventDefault={handleKeyClick} value="P" class="key popup" class:disabled={disabledKeys.includes("p")} class:good={goodKeys.includes("p")}>
        P
    </button>
    <div class="empty-half" />
    <button on:click|preventDefault={handleKeyClick} value="A" class="key popup" class:disabled={disabledKeys.includes("a")} class:good={goodKeys.includes("a")}>
        A
    </button>
    <button on:click|preventDefault={handleKeyClick} value="S" class="key popup" class:disabled={disabledKeys.includes("s")} class:good={goodKeys.includes("s")}>
        S
    </button>
    <button on:click|preventDefault={handleKeyClick} value="D" class="key popup" class:disabled={disabledKeys.includes("d")} class:good={goodKeys.includes("d")}>
        D
    </button>
    <button on:click|preventDefault={handleKeyClick} value="F" class="key popup" class:disabled={disabledKeys.includes("f")} class:good={goodKeys.includes("f")}>
        F
    </button>
    <button on:click|preventDefault={handleKeyClick} value="G" class="key popup" class:disabled={disabledKeys.includes("g")} class:good={goodKeys.includes("g")}>
        G
    </button>
    <button on:click|preventDefault={handleKeyClick} value="H" class="key popup" class:disabled={disabledKeys.includes("h")} class:good={goodKeys.includes("h")}>
        H
    </button>
    <button on:click|preventDefault={handleKeyClick} value="J" class="key popup" class:disabled={disabledKeys.includes("j")} class:good={goodKeys.includes("j")}>
        J
    </button>
    <button on:click|preventDefault={handleKeyClick} value="K" class="key popup" class:disabled={disabledKeys.includes("k")} class:good={goodKeys.includes("k")}>
        K
    </button>
    <button on:click|preventDefault={handleKeyClick} value="L" class="key popup" class:disabled={disabledKeys.includes("l")} class:good={goodKeys.includes("l")}>
        L
    </button>
    <div class="empty-half" />
    <button bind:this={shiftButton} on:click|preventDefault={handleKeyClick} value="SHIFT" class="key wide">
        SHFT
    </button>
    <button on:click|preventDefault={handleKeyClick} value="Z" class="key popup" class:disabled={disabledKeys.includes("z")} class:good={goodKeys.includes("z")}>
        Z
    </button>
    <button on:click|preventDefault={handleKeyClick} value="X" class="key popup" class:disabled={disabledKeys.includes("x")} class:good={goodKeys.includes("x")}>
        X
    </button>
    <button on:click|preventDefault={handleKeyClick} value="C" class="key popup" class:disabled={disabledKeys.includes("c")} class:good={goodKeys.includes("c")}>
        C
    </button>
    <button on:click|preventDefault={handleKeyClick} value="V" class="key popup" class:disabled={disabledKeys.includes("v")} class:good={goodKeys.includes("v")}>
        V
    </button>
    <button on:click|preventDefault={handleKeyClick} value="B" class="key popup" class:disabled={disabledKeys.includes("b")} class:good={goodKeys.includes("b")}>
        B
    </button>
    <button on:click|preventDefault={handleKeyClick} value="N" class="key popup" class:disabled={disabledKeys.includes("n")} class:good={goodKeys.includes("n")}>
        N
    </button>
    <button on:click|preventDefault={handleKeyClick} value="M" class="key popup" class:disabled={disabledKeys.includes("m")} class:good={goodKeys.includes("m")}>
        M
    </button>
    <button bind:this={deleteButton} on:click|preventDefault={handleKeyClick} value="DEL" class="key wide">
        DEL
    </button>
</div>

<style>
    #root {
        display: grid;
        grid-template-rows: repeat(4, 3.5rem);
        grid-template-columns: repeat(20, 1fr);
        padding: 0.5rem;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        place-items: stretch;
    }

    .key {
        position: relative;
    }

    .key, .key::before {
        display: grid;
        place-items: center;
        grid-column: span 2;
        font-size: 1.5rem;
        padding: 0;
        margin: 0;
        outline: none;
        border: none;
        background: #c0c0c0;
        border-radius: 0.5rem;
        border: 0.125rem solid white;
        border-bottom-width: 0.3rem;
        border-top-width: 0.3rem;
        font-weight: 800;
        user-select: none;
        -webkit-user-select: none;
    }

    .key:active {
        background: #808080;
        border-color: #c0c0c07f;
    }

    .key::before {
        pointer-events: none;
        content: attr(value);
        position: absolute;
        top: -160%;
        left: 50%;
        transform: translateX(-50%);
        width: 150%;
        height: 150%;
        border: 1px solid black;
        font-size: 2rem;
        opacity: 0;
        transition: opacity 0ms;
        transition-delay: opacity 100ms;
    }

    .key.popup:active::before {
        transition-delay: opacity 1s;
        opacity: 1;
    }

    .wide {
        grid-column: span 3;
        font-size: 0.75rem;
    }

    .ultrawide {
        grid-column: span 12;
        font-size: 1.2rem;
        transition: background 250ms, color 25ms;
    }

    .invalid {
        background: rgb(235, 133, 128);
    }

    button:disabled {
        pointer-events: none;
        background: #e0e0e0;
        color: #999;
    }

    .key.disabled {
        background: #e0e0e0;
        color: #999;
    }

    .key.good {
        background: rgb(80, 194, 104);
    }

</style>