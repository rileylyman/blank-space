<script lang="ts">
    import { enhance } from "$app/forms";
    import { BS_HOME_SKIP } from "$lib/links";
    import { type BsResponse } from "$lib/blankspace-game-api";
    import Fa from 'svelte-fa';
    import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';;;;
    import { goto } from "$app/navigation";
    import GuessTable from "$lib/ui/GuessTable.svelte";
    import type { BsGameFeedback } from "$lib/schema";
    import { page } from "$app/stores";

    export let response: BsResponse;
    export let form: { success: boolean } | null;
    export let oldFeedback: BsGameFeedback | null;

    if (!response.result || !response.result.hints.length || !response.result.hints.every((h) => h.submitted)) {
        throw new Error("invalid game");
    }
    $: result = response.result!;

    let selectedTags: string[] = [
    ];

    let possibleTags = [
        "too hard",
        "too easy",
        "change hint order",
        "loved it",
        "hated it",
        "exciting",
        "boring",
        "frustrating",
        "confusing",
        "funny",
        "bad hints",
    ];

    let thumbs: boolean | null = null;
    let feedback: string = "";
    $: tags = selectedTags.join(',');

    let restored = false;
    const restoreFeedback = () => {
        if (!oldFeedback) return;
        feedback = oldFeedback.feedback;
        selectedTags = oldFeedback.tags.split(",");
        thumbs = oldFeedback.thumbs;
        restored = true;
    }

    $: {
        if ($page.url.searchParams.get('edit') === 'true') {
            restoreFeedback();
        }
    }

    $: returnTo = $page.url.searchParams.get('from');
    $: {
        if (form?.success) {
            restored = false;
        }
    }

    const handleCancel = () => {
        if (returnTo) {
            goto(returnTo);
        } else {
            restored = false;
        }
    }
</script>

<div id="root">
    {#if oldFeedback && !restored}
        <h1 style="text-align: center"> Feedback submitted! </h1>
        <div style="width: 100%; display: grid; place-items: center">
            <button class="submit" on:click={() => goto(returnTo ?? BS_HOME_SKIP)}> Done </button>
            <button class="submit" on:click={restoreFeedback}> Edit feedback </button>
        </div>
    {:else}
        <h1>You { result.won ? 'Won!' : 'Lost!' }</h1>
        <div class="rating"> 
            <div class="thumbs">
            <span>Rate This Round:</span> 
            <button on:click={() => thumbs = false} class:selected={thumbs === false}><Fa size="1.5x" icon={faThumbsDown} /> </button>
            <button on:click={() => thumbs = true} class:selected={thumbs === true}><Fa size="1.5x" icon={faThumbsUp} /> </button>
            </div>
            <div class="tags">
                {#each possibleTags as tag}
                    <button 
                        on:click|preventDefault={() => {
                            if (selectedTags.includes(tag)) {
                                selectedTags = selectedTags.filter((t) => t !== tag);
                            } else {
                                selectedTags = [tag, ...selectedTags];
                            }
                        }}
                        class:selected={selectedTags.includes(tag)}
                    >
                        {tag.toLocaleLowerCase()}
                    </button>
                {/each}
            </div>
        </div>
        <div class="feedback">
            <h2> Leave your feedback: </h2>
            <textarea bind:value={feedback} placeholder="(optional) enter any feedback you might have" />
        </div>
        <form action="?/feedback" method="POST" use:enhance={({ cancel }) => { thumbs === null && cancel() }}>
            <input type="hidden" bind:value={feedback} name="feedback" />
            <input type="hidden" bind:value={thumbs} required name="thumbs" />
            <input type="hidden" bind:value={tags} name="tags" />
            <div style="display: flex; width: 100%; justify-content: center;">
                {#if oldFeedback}
                    <button class="submit" on:click|preventDefault={handleCancel}> Cancel </button>
                {/if}
                <button class:inactive={thumbs === null} type="submit" class="submit"> Submit </button>
            </div>
        </form>
        <GuessTable target={result.target ?? ""} guesses={result.hints.map(({ guess }) => guess)} fullHints={result.fullHints} />
    {/if}
</div>

<style>
    #root {
        width: 100%;
        height: 100%;
        padding: 1rem;
        display: grid;
        align-items: center;
        justify-items: stretch;
    }

    .thumbs {
        display: grid;
        grid-template-columns: 5fr 1fr 1fr;
        grid-column-gap: 1rem;
        margin-bottom: 0.5rem;
        align-items: center;
    }

    .thumbs span {
        font-weight: bold;
        font-size: 1.5rem;
    }

    .thumbs button {
        display: grid;
        place-items: center;
        outline: none;
        border: 1px solid black;
        background-color: white;
        border-radius: 0.25rem;
        height: 3rem;
        aspect-ratio: 1/1;
    }

    .thumbs button.selected {
        background: rgb(250, 113, 79);
        border: none;
        color: white;
    }

    .thumbs button:last-of-type.selected {
        background-color: rgb(80, 194, 104);
    }
    
    .tags {
        display: flex;
        justify-content: start;
        flex-flow: row wrap;
        width: 100%;
        margin-left: -0.25rem;
    }

    .tags button {
        border-radius: 0.5rem;
        border: 1px solid black;
        margin: 0.25rem;
        padding: 0 0.25rem;
        background: #f7f7f7;
        outline: none;
    }

   .tags button.selected {
        background: black;
        color: white;
    }

    .feedback textarea {
        height: 15vh;
        width: 100%; 
        padding: 0.25rem 1rem;
        overflow: hidden;
        border: 1px solid black;
    }

    form {
        display: grid;
        place-items: center;
    }

    .submit {
        background: black;
        color: white;
        border: none;
        border-radius: 0.25rem;
        font-size: 1.5rem;
        width: 80%;
        justify-self: center;
        margin: 0.5rem 0.5rem 1rem 0.5rem;
        height: 3rem;
    }

    .submit.inactive {
        pointer-events: none;
        background: #555;
        color: #bbb;
    }
</style>