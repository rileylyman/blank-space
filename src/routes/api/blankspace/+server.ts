import {
    type BsGame,
    type BsGameProgress,
    bsGameHints,
    bsGameAllLowercase
} from "$lib/schema";
import fs from 'fs';
import type TypedPocketBase from "$lib/schema";
import { type RequestEvent, json } from "@sveltejs/kit"
import { BsRequestParser, type BsResponse } from "$lib/blankspace-game-api";
import { fromZodError } from 'zod-validation-error';
import { SCORES } from "$lib/constants";

let dictionaryList = fs.readFileSync("./src/routes/api/blankspace/words.txt", { encoding: 'utf16le' }).split('\n').map((s) => s.trim());
let dictionary: Set<string> = new Set(dictionaryList);

export const POST = async (event: RequestEvent) => {
    let response: BsResponse = {
        result: null,
        error: null,
        invalidWord: false,
    };

    let gameId: string, userId: string, setId: string, guess: string | undefined;
    [{ userId, gameId, setId, guess }, response.error] = parseRequest(event);
    if (response.error) return json(response, { status: 400 });

    if (guess && !dictionary.has(guess)) {
        response.error = "not a word";
        response.invalidWord = true;
        return json(response, { status: 200 });
    }

    let game: BsGame | null;
    [ game, response.error ] = await getGame(event.locals.pb, gameId);
    if (!game) return json(response, { status: 400 });

    let progress: BsGameProgress | null;
    [progress, response.error] = await getProgress(event.locals.pb, { gameId, setId, userId });
    if (!progress) return json(response, { status: 400 });

    let fullHints = bsGameHints(game);

    let guesses = progress.guesses.split(',').filter((s) => s);
    let guessAllowed = !progress.won && guesses.length < fullHints.length;
    if (guess && guessAllowed) {
        guesses.push(guess);
    } else if (guess && !guessAllowed) {
        response.error = "you cannot make any more guesses";
        return json(response, { status: 400 });
    }

    let won = progress.won || guess === game.target;

    const cleanHint = (guess: string, i: number) => {
        const hint = fullHints[i].replace(game?.target ?? "", '').trim();
        const before = fullHints[i].indexOf(game?.target ?? "") < fullHints[i].indexOf(hint);
        return { hint, before, guess, submitted: !!guess };
    }

    let lost = false;
    let hints = guesses.map(cleanHint);
    if (!won && guesses.length < fullHints.length) {
        hints.push(cleanHint("", guesses.length));
    } else if (!won) {
        lost = true;
    }

    response.result = {
        won,
        lost, 
        target: (won || lost) ? game.target : undefined,
        hints,
        fullHints: (won || lost) ? bsGameHints(game) : [],
    }

    let score: number | undefined = undefined;
    if (won || lost) {
        score = lost ? 0 : SCORES.at(guesses.length - 1);
        response.result.score = score;
    }

    if (guess) {
        try {
            if (progress.id) {
                await event.locals.pb
                    .collection('bs_game_progress')
                    .update(progress.id, { won, lost, guesses: guesses.join(','), score});
            } else {
                await event.locals.pb
                    .collection('bs_game_progress')
                    .create({ bs_game: gameId, bs_game_set: setId, user: userId, won, lost, guesses: guesses.join(','), score });
            }
        } catch (err) {
            console.log(err);
            return json({ error: 'internal server error: could not update progress' }, { status: 500 });
        }
    }

    return json(response);
}

const getGame = async (pb: TypedPocketBase, gameId: string): Promise<[BsGame | null, string | null]> => {
    let game: BsGame;
    try {
        game = await pb
            .collection('bs_games')
            .getOne(gameId);
        bsGameAllLowercase(game);
        return [game, null];
    } catch (_) {
        return [null, 'invalid game id'];
    }
}

const getProgress = async (pb: TypedPocketBase, args: { userId: string, gameId: string, setId: string }): Promise<[BsGameProgress | null, string | null]> => {
    let progress: BsGameProgress;
    try {
        progress = await pb
            .collection('bs_game_progress')
            .getFirstListItem(
                `user.id = "${args.userId}" && bs_game.id = "${args.gameId}" && bs_game_set.id = "${args.setId}"`);
    } catch (_) {
        progress = { id: "", bs_game: args.gameId, bs_game_set: args.setId, user: args.userId, guesses: "", won: false, lost: false };
    }
    return [progress, null];
}

const parseRequest = (event: RequestEvent): [{userId: string, gameId: string, setId: string, guess: string | undefined}, string | null] => {
    let ret = { userId: "", setId: "", gameId: "", guess: "" };
    if (!event.locals.pb.authStore.isValid || !event.locals.pb.authStore.model?.id) {
        return [ret, 'not authenticated'];
    }
    const userId = event.locals.pb.authStore.model.id;

    const res = BsRequestParser.safeParse(Object.fromEntries(event.url.searchParams));
    if (!res.success) {
        return [ret, fromZodError(res.error).toString()];
    }
    let { gameId, setId, guess } = res.data;
    guess = guess?.toLocaleLowerCase().trim();

    return [{ userId, gameId, setId, guess}, null];
}