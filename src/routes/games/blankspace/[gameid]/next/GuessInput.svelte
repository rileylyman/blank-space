<script lang="ts">
    export let value: string;
</script>

<input bind:value on:change style={`width: ${value.length + 1}ch`} type=text />

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
}
</style>
