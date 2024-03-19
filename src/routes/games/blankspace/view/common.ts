import { type BsGame, type BsGameSet, type BsGameFeedback, type BsGameProgress } from "$lib/schema";

export interface GameAllInfo {
    setId: string;
    game: BsGame;
    gameIdx: number;
    feedbacks: BsGameFeedback[],
    prog?: BsGameProgress;
    thumbsDown: number;
    thumbsUp: number;
}
