<script lang="ts">
    import Curtain from "./Curtain.svelte";

    let folded = false;
    let foldedHeight = "25%";
</script>

<div id="root">
    <Curtain bind:folded {foldedHeight} />

    <div />
    <p> hey </p>
    <p> hey </p>
    <p> hey </p>
</div>

<style>
    #root {
        background: white;
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-rows: 25% 25% 25% 25%;
    }
</style>