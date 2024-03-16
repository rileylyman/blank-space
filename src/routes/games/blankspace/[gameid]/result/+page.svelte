<script lang="ts">
    import { SCORES } from "$lib/constants";

    export let data;

    $: won = data.bsResponse.result!.won;
    $: score = won ? SCORES.at(data.bsResponse.result!.hints.length - 1)! : 0;
</script>

you {won ? 'won' : 'lost'} with a score of {score}

<style>
</style>