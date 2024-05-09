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
      g.target = g.target.toLocaleLowerCase().trim();
      g.hint1 = g.hint1.toLocaleLowerCase().trim();
      g.hint2 = g.hint2.toLocaleLowerCase().trim();
      g.hint3 = g.hint3.toLocaleLowerCase().trim();
      g.hint4 = g.hint4.toLocaleLowerCase().trim();
      g.pity_hint = g.pity_hint.toLocaleLowerCase().trim();
}

export const censorGame = (game: BsGame) => {
    game.target = "";
    game.hint1 = "";
    game.hint2 = "";
    game.hint3 = "";
    game.hint4 = "";
    game.pity_hint = "";
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
    bs_game_set: string;
    user: string;
    guesses: string;
    won: boolean;
    lost: boolean;
    score: number;
    flags: number;

    expand?: {
        bs_game_set?: BsGameSet;
    }
}

export enum ProgressFlags {
    None = 0,
    NumLettersShown = 1 << 0,
    KeyboardUpdated = 1 << 1,
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
    id: string;
    games: string[];
    publish_on: string;
    next_set_avail?: string | null;
    expand?: {
        games?: BsGame[];
    }
}

export interface BsStats {
    user: string;
    avg_score: number;
    total_games: number;
    won_games: number;
    gd1: number | null;
    gd2: number | null;
    gd3: number | null;
    gd4: number | null;
    gd5: number | null;
}

export interface BsWeeklyStanding {
    id: string;
    user: string;
    username: string;
    total_score: number;
    games_played: number;
    total_games: number;
    agg_flags: string;

    // Augmented client side
    rank?: number;
    rankPf?: number;
    rankHc?: number;
    flags?: number;
}

export interface FeatureControl {
    name: string;
    filter: string;
    enabled: boolean;
}

export interface Announcement {
    id: string;
    title: string;
    message: string;
    release_on: string;
}

export interface AnnouncementsRead {
    id: string;
    user: string;
    read: string[];
}

export interface UserPreferences {
    id: string;
    user: string;

    peacefulMode: boolean;
}

export interface Rules {
    text: string;
    written_on: string;
}

export default interface TypedPocketBase extends PocketBase {
    collection(idOrName: string): RecordService;
    collection(idOrName: 'users'): RecordService<PbUser>;
    collection(idOrName: 'bs_games'): RecordService<BsGame>;
    collection(idOrName: 'bs_game_progress'): RecordService<BsGameProgress>;
    collection(idOrName: 'bs_current_set_progress'): RecordService<BsGameProgress>;
    collection(idOrName: 'bs_game_feedback'): RecordService<BsGameFeedback>;
    collection(idOrName: 'bs_game_sets'): RecordService<BsGameSet>;
    collection(idOrName: 'bs_current_set'): RecordService<BsGameSet>;
    collection(idOrName: 'bs_stats'): RecordService<BsStats>;
    collection(idOrName: 'bs_this_week_scores'): RecordService<BsWeeklyStanding>;
    collection(idOrName: 'bs_last_week_scores'): RecordService<BsWeeklyStanding>;
    collection(idOrName: 'bs_this_week_sets'): RecordService<BsGameSet>;
    collection(idOrName: 'bs_last_week_sets'): RecordService<BsGameSet>;
    collection(idOrName: 'feature_control'): RecordService<FeatureControl>;
    collection(idOrName: 'announcements'): RecordService<Announcement>;
    collection(idOrName: 'announcements_read'): RecordService<AnnouncementsRead>;
    collection(idOrName: 'current_announcement'): RecordService<Announcement>;
    collection(idOrName: 'user_preferences'): RecordService<UserPreferences>;
    collection(idOrName: 'rules'): RecordService<Rules>;
}