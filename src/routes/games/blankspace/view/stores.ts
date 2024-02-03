import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const scrollY = writable(0);
export const expandedIndices: Writable<number[]> = writable([]);