<script lang="ts">
    import Fa from "svelte-fa";
    import { faSpinner } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";

    let rotation = 0;
    const speed = 5;

    onMount(() => {
        const interval = setInterval(() => {
            rotation = (rotation + speed) % 360;

        }, 25);
        return () => clearInterval(interval);
    });
</script>

<div id="root">
    <h1> Loading </h1>
    <div>
        <Fa icon={faSpinner} rotate={rotation} />
    </div>
</div>

<style>
    #root {
        height: 100vh;
        height: 100svh;
        width: 100%;
        display: grid;
        place-items: center;
        grid-template-rows: 10rem 1fr 10rem;
    }

    #root div {
        margin: 0 auto;
        font-size: calc(min(20vw, 20vh));
    }
</style>