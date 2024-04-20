<script lang="ts">
    export let value: string;
    export let incorrect: boolean;
    export let targetLength: number | undefined = undefined;

    $: shownValue = value.padEnd(targetLength!, '*');
    $: {
        shownValue = shownValue ? shownValue : String.fromCharCode(160);
    }
</script>

<div>
    <span class:incorrect style={`width: calc(${shownValue.length + 1}ch + 2rem)`}> {shownValue} </span>
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
    transition: color 250ms;
}

span.incorrect {
    color: red;
}

div {
    padding: 0;
    margin: 0;
    position: relative;
}
</style>
