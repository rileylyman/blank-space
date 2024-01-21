<script lang="ts">
    export let value: string;
    export let strike: boolean;
    $: shownValue = value ? value : String.fromCharCode(160);
</script>

<div class:strike>
    <span style={`width: calc(${shownValue.length + 1}ch + 2rem)`}> {shownValue} </span>
</div>

<style>
span {
    font-family: 'Source Code Pro', 'Fira Sans', sans-serif;
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
    left: 0.5rem;
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
        width: calc(100% - 2rem);
    }
}

</style>
