import { z } from 'zod';

export const BsRequestParser = z.object({
    gameId: z.string().regex(/^[a-zA-Z0-9]+$/).length(15),
    guess: z.string().regex(/^[a-zA-Z]+$/).optional()
});
export type BsRequest = z.infer<typeof BsRequestParser>;

export const BsResponseParser = z.object({
    error: z.string().nullable(),
    result: z.object({
        won: z.boolean(),
        lost: z.boolean(),
        target: z.string().optional(),
        hints: z.array(z.object({
            hint: z.string(),
            before: z.boolean(),
            guess: z.string(),
            submitted: z.boolean(),
        })),
        fullHints: z.array(z.string()),
    }).nullable()
});
export type BsResponse = z.infer<typeof BsResponseParser>;