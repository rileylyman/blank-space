import { z } from 'zod';

export const BsRequestParser = z.object({
    gameId: z.string().regex(/^[a-z0-9]+$/).length(15),
    guess: z.string().regex(/^[a-z]+$/).optional()
});
export type BsRequest = z.infer<typeof BsRequestParser>;

export const BsResponseParser = z.object({
    error: z.string().nullable(),
    result: z.object({
        won: z.boolean(),
        target: z.string().optional(),
        prevHints: z.array(z.object({
            hint: z.string(),
            before: z.boolean(),
            guess: z.string(),
        })),
        nextHint: z.object({
            hint: z.string(),
            before: z.boolean(),
        }).nullable(),
        allHints: z.array(z.string()),
    }).nullable()
});
export type BsResponse = z.infer<typeof BsResponseParser>;