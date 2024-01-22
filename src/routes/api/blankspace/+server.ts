import {
    type BsGame,
    type BsGameProgress,
    bsGameHints,
    bsGameAllLowercase
} from "$lib/schema";
import type TypedPocketBase from "$lib/schema";
import { type RequestEvent, json } from "@sveltejs/kit"
import { BsRequestParser, type BsRequest, type BsResponse } from "$lib/blankspace-game-api";
import { fromZodError } from 'zod-validation-error';

export const POST = async (event: RequestEvent) => {
    let response: BsResponse = {
        result: null,
        error: null,
    };

    let gameId: string, userId: string, guess: string | undefined;
    [{ userId, gameId, guess }, response.error] = parseRequest(event);
    if (response.error) return json(response, { status: 400 });

    let game: BsGame | null;
    [ game, response.error ] = await getGame(event.locals.pb, gameId);
    if (!game) return json(response, { status: 400 });

    let progress: BsGameProgress | null;
    [progress, response.error] = await getProgress(event.locals.pb, { gameId, userId });
    if (!progress) return json(response, { status: 400 });

    let hints = bsGameHints(game).map((fullHint): { hint: string, before: boolean} => {
        const hint = fullHint.replace(game?.target ?? "", '').trim();
        const before = fullHint.indexOf(game?.target ?? "") < fullHint.indexOf(hint);
        return { hint, before };
    });

    let guesses = progress.guesses.split(',').filter((s) => s);
    let guessAllowed = !progress.won && guesses.length < hints.length;
    if (guess && guessAllowed) {
        guesses.push(guess);
    } else if (guess && !guessAllowed) {
        response.error = "you cannot make any more guesses";
        return json(response, { status: 400 });
    }

    let prevHints = guesses.map((g, i) => { return { hint: hints[i].hint, before: hints[i].before, guess: g } });
    let nextHint = hints.at(guesses.length) ?? null;
    let won = progress.won || guess === game.target;

    response.result = {
        won,
        target: won ? game.target : undefined,
        prevHints,
        nextHint,
        allHints: won ? bsGameHints(game) : [],
    }

    try {
        await event.locals.pb
            .collection('bs_game_progress')
            .update(progress.id, { won, guesses: guesses.join(',')});
    } catch (err) {
        console.log(err);
        return json({ error: 'internal server error: could not update progress' }, { status: 500 });
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

const getProgress = async (pb: TypedPocketBase, args: { userId: string, gameId: string }): Promise<[BsGameProgress | null, string | null]> => {
    let progress: BsGameProgress;
    try {
        progress = await pb
            .collection('bs_game_progress')
            .getFirstListItem(`user.id = "${args.userId}" && bs_game.id = "${args.gameId}"`);
    } catch (_) {
        progress = { id: "", bs_game: args.gameId, user: args.userId, guesses: "", won: false };
        try {
            progress = await pb
                .collection('bs_game_progress')
                .create(progress);
        } catch (_) {
            return [null, 'could not create progress'];
        }
    }
    return [progress, null];
}

const parseRequest = (event: RequestEvent): [{userId: string, gameId: string, guess: string | undefined}, string | null] => {
    let ret = { userId: "", gameId: "", guess: "" };
    if (!event.locals.pb.authStore.isValid || !event.locals.pb.authStore.model?.id) {
        return [ret, 'not authenticated'];
    }
    const userId = event.locals.pb.authStore.model.id;

    const res = BsRequestParser.safeParse(Object.fromEntries(event.url.searchParams));
    if (!res.success) {
        return [ret, fromZodError(res.error).toString()];
    }
    const { gameId, guess } = res.data;

    return [{ userId, gameId, guess}, null];
}