import { type BsGame, type BsGameFeedback, type BsGameProgress } from "$lib/schema";

export interface GameAllInfo {
    game: BsGame;
    feedbacks: BsGameFeedback[],
    prog?: BsGameProgress;
    thumbsDown: number;
    thumbsUp: number;
}
