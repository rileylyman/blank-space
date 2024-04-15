import { type BsGameProgress, type BsGameSet } from "$lib/schema";

export interface DayProgress {
    set: BsGameSet;
    progs: BsGameProgress[];
}