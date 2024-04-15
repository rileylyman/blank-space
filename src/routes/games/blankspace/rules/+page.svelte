<script lang="ts">
    import { BS_HOME_SKIP_MENU } from "$lib/links";
    import { faX } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
</script>

<div id="root">

<h1>
    HOW TO PLAY BLANKSPACE
</h1>

<p>
    Each day, you will get four <b>puzzles</b> to solve. 
</p>

<p>
    The answer to each puzzle is a single <b>“target”</b> word. This target word combines with all five of the puzzle's clues to form five <b>COMPOUND WORDS</b> (like <b>water</b>melon)  or <b>SHORT PHRASES</b> (like ice <b>water</b>).
</p>

<p>
    The “BlankSpace” in each clue will show you <i>where</i> the target word works with that particular clue, but doesn’t reveal if it’s a compound word or creates a phrase.
</p>

<p>
    Here’s an example of a single puzzle:
</p>

<p class="clue">
    CLUE #1: RUNNING ____
</p>

<p>
    We need to think of a word that can fill in the BLANKSPACE after "running" to create a compound word or phrase. For instance, we could enter "water" for a guess of "RUNNING WATER".
</p>

<p class="clue">
    CLUE #1: RUNNING <span class="incorrect">WATER</span>
</p>
<p class="clue" style="margin-top: 0">
    CLUE #2: ____ WASH
</p>

<p>
    In this case, "water" was not the <b>target word</b>, so our guess is turned red, and the next clue is presented to us. 
</p>

<p>
    Let's say we enter "car" to guess "CAR WASH." Notice how "car" also combines with the first clue, "RUNNING ___", to form "RUNNING CAR." This is because we are guessing a <b>target word</b> that works with each of the clues.
</p>

<p class="clue">
    CLUE #1: RUNNING <span class="incorrect">WATER</span>
</p>
<p class="clue" style="margin-top: 0">
    CLUE #2: <span class="incorrect">CAR</span> WASH
</p>
<p class="clue" style="margin-top: 0">
    CLUE #3: ____ TALK
</p>

<p>
    We guessed wrong again. So now we are looking for a guess that works with "___ TALK" but also works with "___ WASH" and "RUNNING ____." Let's guess "back".
</p>

<p class="clue">
    CLUE #1: RUNNING <span class="incorrect">WATER</span>
</p>
<p class="clue" style="margin-top: 0">
    CLUE #2: <span class="incorrect">CAR</span> WASH
</p>
<p class="clue" style="margin-top: 0">
    CLUE #3: <span class="correct">BACK</span> TALK
</p>
<p class="clue" style="margin-top: 0">
    WINNER!
</p>

<p>
    Nice! "back" was the <b>target word</b>. See how "back" also works with the previous clues’ blank spaces to make  "running back" (a short phrase) and "backwash" (a compound word)?
</p>

<p>
    Each puzzle has five clues, and you lose if you fail to guess the correct target word within those five clues. If you don’t have a guess for one of the clues, you can just enter any word and proceed to the next clue.
</p>

<p>
    A game can be paused and returned to later by hitting the “Take a Break” button at the top.
</p>

<h2>
    SCORING
</h2>

<p>
    Each week of BlankSpace begins on Sunday morning/midnight Pacific Time and runs through the next Saturday.
</p>

<p>
    Each day you’re given four new puzzles to complete. Each of the four games is worth up to 25 points for a possible high score of 100 each day.
</p>

<p>
    Each day’s four games count toward that week’s total score - a perfect score would be 700.  If you miss any games, you can go back at any time during the CURRENT week and finish them up to try to maximize your score and ranking.  Click on “Rankings/Setting” on the home page and then “Play Past Games” to complete unfinished games.  
</p>

<p>
    See how you’re doing compared to other players in the “Rankings” menu.
</p>

<p>
    You can also play any incomplete games from the week before, but that will not affect last week’s final score which has already been calculated.
</p>

<h2>
    SPECIAL NOTES
</h2>

<p>
    BlankSpace Clues WILL sometimes include Proper Names or specific Product Names or Slogans.  
</p>

<p>
    BlankSpace will include occasional Pop Culture references, including titles of movies or songs, names of well known public figures and generational references both old and new.  
</p>

<p>
    BlankSpace is presented in English with only commonly used non-English words and references included. 
</p>

<p>
    BlankSpace will try to stay above board and not get down and dirty with clues or Target Words.  
</p>

</div>

<a href={BS_HOME_SKIP_MENU}> <Fa icon={faX} /> </a>

<style>
    #root {
        background: white;
        width: 100%;
        padding: 1rem;
    }

    p {
        margin-top: 1rem;
    }

    h2 {
        margin-top: 2rem;
    }

    .clue {
        font-size: 1.2rem;
    }

    .incorrect {
        color: red;
    }

    .correct {
        color: green;
    }

    a {
        position: fixed;
        top: 2rem;
        right: 0rem;
        transform: translateX(-50%);
        color: black;
        text-decoration: none;
        background: #c0c0c0;
        font-size: 1.2rem;
        width: 3rem;
        height: 3rem;
        border: 1px solid black;
        border-radius: 50%;
        display: grid;
        place-items: center;
    }
</style>