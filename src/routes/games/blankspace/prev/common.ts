import { GameProgress, type BsGameSet } from "$lib/schema";

export interface DayProgress {
    set: BsGameSet;
    played: number;
    gameProgs: GameProgress[];
}