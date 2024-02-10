import PocketBase, { RecordService } from 'pocketbase';

export interface PbUser {
    id: string;
    username: string;
    email: string;
    verified: boolean;
}

export interface BsGame {
    id: string;
    created?: string;
    updated?: string;

    name: string;
    target: string;
    hint1: string;
    hint2: string;
    hint3: string;
    hint4: string;
    pity_hint: string;
    notes: string;
}

export const bsGameHints = (g: BsGame): string[] =>
    [g.hint1, g.hint2, g.hint3, g.hint4, g.pity_hint];

export const bsGameAllLowercase = (g: BsGame) => {
      g.target = g.target.toLocaleLowerCase();
      g.hint1 = g.hint1.toLocaleLowerCase();
      g.hint2 = g.hint2.toLocaleLowerCase();
      g.hint3 = g.hint3.toLocaleLowerCase();
      g.hint4 = g.hint4.toLocaleLowerCase();
      g.pity_hint = g.pity_hint.toLocaleLowerCase();
}

export const censorGames = (games: Array<BsGame>) => games.forEach((game) => {
    game.target = "";
    game.hint1 = "";
    game.hint2 = "";
    game.hint3 = "";
    game.hint4 = "";
    game.pity_hint = "";
});

export interface BsGameProgress {
    id: string;
    created?: string;
    updated?: string;

    bs_game: string;
    user: string;
    guesses: string;
    won: boolean;
    lost: boolean;
}

export interface BsGameFeedback {
    id: string;
    created?: string;
    updated?: string;

    bs_game: string;
    user: string;
    prog: string;
    feedback: string;
    tags: string;
    thumbs: boolean;

    expand?: {
        user?: PbUser;
        bs_game?: BsGame;
        prog?: BsGameProgress;
    }
}

export interface BsGameSet {
    games: string[];
    publish_on: string;
}

export default interface TypedPocketBase extends PocketBase {
    collection(idOrName: string): RecordService;
    collection(idOrName: 'users'): RecordService<PbUser>;
    collection(idOrName: 'bs_games'): RecordService<BsGame>;
    collection(idOrName: 'bs_game_progress'): RecordService<BsGameProgress>;
    collection(idOrName: 'bs_game_feedback'): RecordService<BsGameFeedback>;
    collection(idOrName: 'bs_game_sets'): RecordService<BsGameSet>;
}