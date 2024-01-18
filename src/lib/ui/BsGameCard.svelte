<script lang="ts">
    import { type BsGame, type BsGameCompletion } from '$lib/schema';
    const game: BsGame = {
        id: "j6bxd8msshethev",
        name: '85',
        target: 'foot',
        hint1: 'foot long',
        hint2: 'foot wear',
        hint3: 'foot stool',
        hint4: 'football',
        pity_hint: 'foot print',
        notes: '',
    };
    let completion: BsGameCompletion | null = {
        id: '123',
        bs_game: game.id,
        user: '123',
        elapsed_ms: 34000,
        guess_index: 1,
        failed: false,
    };
    // completion = null;

    $: color = !completion ? '#fcfcfa' : (completion.failed ? '#ffdddd' : '#c0ffc5');
</script>

<div id="root" style={`background: ${color}`}>
</div>

<style>
    #root {
        width: 100%;
        height: 100%;
        border: 2px solid black;
        border-radius: 0.5rem;
    }
</style>