<script lang="ts">
    import OptionSlider from '$lib/ui/OptionSlider.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let options = ['Mist', 'Rain', 'Thunder'];
    let optionIdx = 0;
</script>

<div id="root">
    <div id="main">
        <h1 class="title"> Blank Space </h1>
        <div class="choose-your-difficulty">
            <h1> Choose Your Difficulty </h1>
            <div class="option-slider-container">
                <OptionSlider {options} bind:optionIdx />
            </div>
        </div>
        <div class="button-container">
            <button class="button" on:click={() => dispatch('play')}> Play </button>
            <a class="button" href="#rules"> See Rules </a>
        </div>
    </div>
    <div id="rules">
        <h1>
            <b>Blank Space</b>
        </h1>
        <br/>
        <h2>
            How to Play
        </h2>
        <p>
            Your goal is to discover the elusive <em><b>TARGET WORD</b></em> using a
            series of clues. Each clue can form a compound word or a
            short phrase with the <em><b>TARGET WORD</b></em>.

            <br/>
            <br/>
            
            For instance, if the
            <em><b>TARGET WORD</b></em> is "space," possible clues are "blank ____,"
            "____ cadet," or "____-time continuum." It's important to
            remember that the <em><b>TARGET WORD</b></em> will always be at the
            beginning or end of the phrase, never in the middle.
        </p>
        <br/>
        <h2>
            Scoring
        </h2>
        <p>
            You score points based on how quickly you identify the
            <em><b>TARGET WORD</b></em>. Guessing correctly on the first clue earns you 10
            points, the second clue gets you 5 points, the third 3 points,
            and the fourth 1 point.
        </p>

        <a class="button" href="#main"> Done </a>

    </div>
</div>

<style>
    @import '$lib/css/button-reset.css';

    h1 {
        margin: 0;
    }

    a {
        color: inherit;
        text-decoration: inherit;
    }

    a:visited {
        color: inherit;
    }

    #root {
        scroll-behavior: smooth;
        position: absolute;
        background: white;
        border: 1px solid black;
        border-radius: 0.5rem;
        width: 70%;
        height: 80%;
        max-width: 100rem;
        overflow-y: auto;
        text-align: center;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    @media (max-aspect-ratio: 1/1.5) {
        #root {
            width: auto;
            height: 100%;
            border: none;
            border-radius: none;
        }
    }

    #root::-webkit-scrollbar {
        display: none;
    }

    #main {
        height: 100%;
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        white-space: nowrap;
    }

    #main .title {
        font-size: 3rem;
    }

    #main .choose-your-difficulty {
        width: 100%;
        max-width: 60rem;
    }

    .button {
        max-width: 26rem;
    }

    #main .option-slider-container {
        width: 100%;
        margin-top: 2rem;
    }

    #main .button-container {
        display: flex;
        width: 100%;
        justify-content: center; 
    }

    #main .button-container .button {
        flex-basis: 100%;
    }

    #rules {
        position: relative;
        margin: 0 auto;
        height: calc(100% - 2rem);
        margin-top: 2rem;
        width: 90%;
        max-width: 40rem;
        padding: 0 5%;
        text-align: left;
    }

    #rules a {
        position: absolute;
        display: block;
        bottom: 2rem;
        margin: 0;
        left: 50%;
        transform: translateX(-50%);
    }

</style>