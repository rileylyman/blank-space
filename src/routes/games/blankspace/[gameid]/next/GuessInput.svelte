<script lang="ts">
    export let value: string;
    export let strike: boolean;
</script>

<div class:strike>
    <input bind:value on:change style={`width: ${value.length + 1}ch`} type=text />
</div>

<style>
input {
    border: none;
    outline: none;
    font-size: 1.5rem;
    min-width: 1rem;
    padding: 0 1rem;
    border-bottom: 2px solid black;
    background: transparent;
    text-transform: uppercase;
    position: relative;
    display: inline-block;
}

div {
    padding: 0;
    margin: 0;
    position: relative;
}

div::after {
    position: absolute;
    top: 50%;
    left: 0;
    width: 0;
    height: 1px;
    background: black;
    display: block;
    content: '';
}

div.strike::after {
    animation: strike 1s forwards 500ms ease-in-out;
}

@keyframes strike {
    to {
        width: 100%;
    }
}

</style>
