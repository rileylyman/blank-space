import { z } from 'zod';
import { type BsGame, bsGameHints } from '$lib/schema';
import { SCORES } from '$lib/constants';

export const BsRequestParser = z.object({
    gameId: z.string().regex(/^[a-zA-Z0-9]+$/).length(15),
    setId: z.string().regex(/^[a-zA-Z0-9]+$/).length(15),
    guess: z.string().regex(/^[a-zA-Z\.]+$/).optional()
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
    }).nullable()
});
export type BsResponse = z.infer<typeof BsResponseParser>;

export const updateGameState = async (
    guess: string | null,
    prevGuesses: Array<string>,
    hasWon: boolean,
    game: BsGame,
    dictionary: ((word: string) => Promise<boolean>),
): Promise<BsResponse> => {
    let response: BsResponse = {
        result: null,
        error: null,
        invalidWord: false,
    };

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

    let guessAllowed = !hasWon && prevGuesses.length < fullHints.length;
    if (guess && guessAllowed) {
        prevGuesses.push(guess);
    } else if (guess && !guessAllowed) {
        response.error = "you cannot make any more guesses";
        return response;
    }

    let won = hasWon || guess === game.target;

    const cleanHint = (guess: string, i: number) => {
        const hint = fullHints[i].replace(game?.target ?? "", '').trim();
        const before = fullHints[i].indexOf(game?.target ?? "") < fullHints[i].indexOf(hint);
        return { hint, before, guess, submitted: !!guess };
    }

    let lost = false;
    let hints = prevGuesses.map(cleanHint);
    if (!won && prevGuesses.length < fullHints.length) {
        hints.push(cleanHint("", prevGuesses.length));
    } else if (!won) {
        lost = true;
    }

    response.result = {
        won,
        lost, 
        hints,
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
        response.result.score = score;
    }

    return response;
}