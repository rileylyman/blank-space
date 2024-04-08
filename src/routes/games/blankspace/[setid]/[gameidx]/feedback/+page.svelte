<script lang="ts">
    import { enhance } from "$app/forms";
    import Fa from 'svelte-fa';
    import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';;;;
    import { goto, preloadData } from "$app/navigation";
    import GuessTable from "$lib/ui/GuessTable.svelte";
    import { onMount } from "svelte";
    import { fitText } from "$lib/utils.js";

    export let data;

    if (!data.bsResponse.result || !data.bsResponse.result.hints.length || !data.bsResponse.result.hints.every((h) => h.submitted)) {
        throw new Error("invalid game");
    }

    $: response = data.bsResponse!;
    $: result = response.result!;

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

    let selectedTags: string[] = data.feedback?.tags.split(",") ?? [];
    let thumbs: boolean | null = data.feedback?.thumbs ?? null;
    let feedback: string = data.feedback?.feedback ?? "";
    $: tags = selectedTags.join(',');

    let submitButtonText = "Submit";

    const onSubmit = () => {
        submitButtonText = "Submitting...";
        setTimeout(() => { 
            submitButtonText = "Error";
            setTimeout(() => { submitButtonText = "Submit" }, 1000);
        }, 2000);
    }

    onMount(() => {
        preloadData(data.from);
        onResize();
    })

    let root: HTMLElement;
    const onResize = () => {
        fitText(root, '.thumbs button div', 0.75);
    }

    const returnTo = data.from;
</script>

<svelte:window on:resize={onResize} />

<div id="root" bind:this={root}>
    <h1>You { result.won ? 'Won!' : 'Lost!' }</h1>
    <div class="rating"> 
        <div class="thumbs">
            <span>Rate This Round:</span> 
            <button on:click={() => thumbs = false} class:selected={thumbs === false}>
                <div><Fa icon={faThumbsDown} /> </div>
            </button>
            <button on:click={() => thumbs = true} class:selected={thumbs === true}>
                <div><Fa icon={faThumbsUp} /> </div>
            </button>
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
        <input type="hidden" value={returnTo} name="returnTo" />
        <div style="display: flex; width: 100%; justify-content: center;">
            <button class="submit" on:click|preventDefault={() => goto(returnTo)}> Cancel </button>
            <button class:inactive={thumbs === null} type="submit" class="submit" on:submit={onSubmit}> Submit </button>
        </div>
    </form>
    <GuessTable target={result.target ?? ""} guesses={result.hints.map(({ guess }) => guess)} fullHints={result.fullHints} />
</div>

<style>
    #root {
        width: 100%;
        height: 100%;
        max-width: 50rem;
        margin: 0 auto;
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
        position: relative;
        font-size: 1.5rem;
        outline: none;
        border: 1px solid black;
        background-color: white;
        border-radius: 0.25rem;
        height: 3rem;
        width: 3rem;
    }

    .thumbs button div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
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
        overflow-y: scroll;
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