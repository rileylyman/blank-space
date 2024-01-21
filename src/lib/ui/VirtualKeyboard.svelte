<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    const handleKeyClick = (e: Event & { currentTarget: HTMLButtonElement }) => {
        dispatch('keypress', { key: e.currentTarget.textContent });
    }
</script>

<div id="root">
    <button on:click|preventDefault={handleKeyClick} value="Q" class="key popup">
        Q
    </button>
    <button on:click|preventDefault={handleKeyClick} value="W" class="key popup">
        W
    </button>
    <button on:click|preventDefault={handleKeyClick} value="E" class="key popup">
        E
    </button>
    <button on:click|preventDefault={handleKeyClick} value="R" class="key popup">
        R
    </button>
    <button on:click|preventDefault={handleKeyClick} value="T" class="key popup">
        T
    </button>
    <button on:click|preventDefault={handleKeyClick} value="Y" class="key popup">
        Y
    </button>
    <button on:click|preventDefault={handleKeyClick} value="U" class="key popup">
        U
    </button>
    <button on:click|preventDefault={handleKeyClick} value="I" class="key popup">
        I
    </button>
    <button on:click|preventDefault={handleKeyClick} value="O" class="key popup">
        O
    </button>
    <button on:click|preventDefault={handleKeyClick} value="P" class="key popup">
        P
    </button>
    <div class="empty-half" />
    <button on:click|preventDefault={handleKeyClick} value="A" class="key popup">
        A
    </button>
    <button on:click|preventDefault={handleKeyClick} value="S" class="key popup">
        S
    </button>
    <button on:click|preventDefault={handleKeyClick} value="D" class="key popup">
        D
    </button>
    <button on:click|preventDefault={handleKeyClick} value="F" class="key popup">
        F
    </button>
    <button on:click|preventDefault={handleKeyClick} value="G" class="key popup">
        G
    </button>
    <button on:click|preventDefault={handleKeyClick} value="H" class="key popup">
        H
    </button>
    <button on:click|preventDefault={handleKeyClick} value="J" class="key popup">
        J
    </button>
    <button on:click|preventDefault={handleKeyClick} value="K" class="key popup">
        K
    </button>
    <button on:click|preventDefault={handleKeyClick} value="L" class="key popup">
        L
    </button>
    <div class="empty-half" />
    <button on:click|preventDefault={handleKeyClick} value="ENTER" class="key wide">
       ENTER 
    </button>
    <button on:click|preventDefault={handleKeyClick} value="Z" class="key popup">
        Z
    </button>
    <button on:click|preventDefault={handleKeyClick} value="X" class="key popup">
        X
    </button>
    <button on:click|preventDefault={handleKeyClick} value="C" class="key popup">
        C
    </button>
    <button on:click|preventDefault={handleKeyClick} value="V" class="key popup">
        V
    </button>
    <button on:click|preventDefault={handleKeyClick} value="B" class="key popup">
        B
    </button>
    <button on:click|preventDefault={handleKeyClick} value="N" class="key popup">
        N
    </button>
    <button on:click|preventDefault={handleKeyClick} value="M" class="key popup">
        M
    </button>
    <button on:click|preventDefault={handleKeyClick} value="DEL" class="key wide">
       DEL
    </button>
</div>

<style>
    #root {
        display: grid;
        grid-template-rows: repeat(3, 3rem);
        grid-template-columns: repeat(20, 1fr);
        grid-column-gap: 0.25rem;
        grid-row-gap: 0.6rem;
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
        border-radius: 0.25rem;
        font-weight: 800;
        user-select: none;
        -webkit-user-select: none;
    }

    .key:active {
        background: #808080;
        outline: 3px solid #c0c0c07f;
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

    .key.wide {
        grid-column: span 3;
        font-size: 0.75rem;
    }
</style>