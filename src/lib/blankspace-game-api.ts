import { z } from 'zod';
import { type BsGame, type BsGameProgress, bsGameHints } from '$lib/schema';
import { SCORES } from '$lib/constants';

export const BsRequestParser = z.object({
    gameId: z.string().regex(/^[a-zA-Z0-9]+$/).length(15),
    setId: z.string().regex(/^[a-zA-Z0-9]+$/).length(15),
    guess: z.string().regex(/^[a-zA-Z\.]+$/).optional(),
    localDict: z.string().regex(/^(true|false)$/).optional(),
    help: z.string().regex(/^(firstLetter)|(numLetters)$/).optional(),
});
export type BsRequest = z.infer<typeof BsRequestParser>;

export const BsResponseParser = z.object({
    error: z.string().nullable(),
    invalidWord: z.boolean(),
    result: z.object({
        won: z.boolean(),
        lost: z.boolean(),
        score: z.number().nonnegative().optional(),
        target: z.string().optional(),
        hints: z.array(z.object({
            hint: z.string(),
            before: z.boolean(),
            guess: z.string(),
            submitted: z.boolean(),
        })),
        fullHints: z.array(z.string()),
        firstLetterHelpBought: z.boolean(),
        numLettersHelpBought: z.boolean(),
    }).nullable()
});
export type BsResponse = z.infer<typeof BsResponseParser>;

export const updateGameState = async (
    guess: string | null,
    help: string | null,
    progress: BsGameProgress,
    game: BsGame,
    dictionary: ((word: string) => Promise<boolean>),
): Promise<BsResponse> => {
    let response: BsResponse = {
        result: null,
        error: null,
        invalidWord: false,
    };
    let prevGuesses = progress.guesses.split(",").filter((s) => s);

    if (guess && guess !== game.target && (guess.length <= 2 || !(await dictionary(guess)))) {
        response.error = guess.length <= 2 ? "too short" : "not a word";
        response.invalidWord = true;
        return response;
    }

    let fullHints = bsGameHints(game);

    if (guess && prevGuesses.includes(guess)) {
        response.error = "already used";
        response.invalidWord = true;
        return response;
    }

    let guessAllowed = !progress.won && prevGuesses.length < fullHints.length;
    if (guess && guessAllowed) {
        prevGuesses.push(guess);
    } else if (guess && !guessAllowed) {
        response.error = "you cannot make any more guesses";
        return response;
    }

    let won = progress.won || guess === game.target;

    const cleanHint = (guess: string, i: number) => {
        const hint = fullHints[i].replace(game.target, '').trim();
        const before = fullHints[i].indexOf(game.target) < fullHints[i].indexOf(hint);
        return { hint, before, guess, submitted: !!guess };
    }

    let lost = false;
    let hints = prevGuesses.map(cleanHint);
    if (!won && prevGuesses.length < fullHints.length) {
        hints.push(cleanHint("", prevGuesses.length));
    } else if (!won) {
        lost = true;
    }

    if ((help === "firstLetter" && progress.firstLetterHelp !== null) || (help === "numLetters" && progress.numLettersHelp !== null)) {
        response.error = "you cannot buy that help again";
        return response;
    }

    let firstLetterHelpBought = help === "firstLetter" || progress.firstLetterHelp !== null;
    let numLettersHelpBought = help === "numLetters" || progress.numLettersHelp !== null;

    response.result = {
        won,
        lost, 
        hints,
        firstLetterHelpBought,
        numLettersHelpBought,
        fullHints: (won || lost) ? bsGameHints(game) : [],
    }
    if (won || lost) {
        // Can't put this in the object literal above or else the response differs
        // locally vs from server
        response.result.target = game.target;
    }

    let score: number | undefined = undefined;
    if (won || lost) {
        score = lost ? 0 : SCORES.at(prevGuesses.length - 1);
    } else {
        score = SCORES.at(prevGuesses.length);
    }
    if (firstLetterHelpBought && score !== undefined) score -= 3;
    if (numLettersHelpBought && score !== undefined) score -= 3;
    response.result.score = score === undefined ? undefined : Math.max(score, 0);

    return response;
}