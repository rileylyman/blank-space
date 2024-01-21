import PocketBase, { RecordService } from 'pocketbase';

export interface PbUser {
    id: string;
    username: string;
    email: string;
    verified: boolean;
}

export interface BsGame {
    id: string;
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

export interface BsGameCompletion {
    id: string;
    bs_game: string;
    user: string;
    elapsed_ms: number;
    guess_index: number;
    failed: boolean;
}

export interface BsGameFeedback {
    id: string;
    bs_game: string;
    user: string;
    feedback: string;
    rating: number;
}

export default interface TypedPocketBase extends PocketBase {
    collection(idOrName: string): RecordService;
    collection(idOrName: 'users'): RecordService<PbUser>;
    collection(idOrName: 'bs_games'): RecordService<BsGame>;
    collection(idOrName: 'bs_game_completions'): RecordService<BsGameCompletion>;
    collection(idOrName: 'bs_game_feedback'): RecordService<BsGameFeedback>;
}