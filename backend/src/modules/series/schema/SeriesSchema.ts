import { z } from 'zod';

export const createSeriesSchema = z.object({
  title: z.string().min(1),

  genre: z.string().min(1),

  seasons: z.number().int().positive(),

  episodes: z.number().int().positive(),

  rating: z.number().min(0).max(10),

  releaseYear: z.number().int(),

  description: z.string().min(1),

  // Recommendation

  characterDevelopment: z.number().min(0).max(10),

  storyComplexity: z.number().min(0).max(5),

  episodeAddiction: z.number().int().min(0).max(100),

  dramaLevel: z.number().min(0).max(10),

  humorLevel: z.number().min(0).max(5),
});

export const updateSeriesSchema = createSeriesSchema.partial();
