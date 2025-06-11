import { z } from 'zod';

export const createGameSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  tournamentId: z.string().optional(),
});

export type TCreateGameSchema = z.infer<typeof createGameSchema>;
