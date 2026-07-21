import { z } from 'zod';

export const createMovieSchema = z.object({
  title: z.string().min(1),

  genre: z.string().min(1),

  duration: z.number().int().positive(),

  rating: z.number().min(0).max(10),

  releaseYear: z.number().int(),

  description: z.string().min(1),

  // Recommendation

  actionIntensity: z.number().int().min(0).max(100),

  storyDepth: z.number().min(0).max(10),

  visualQuality: z.number().min(0).max(5),

  emotionLevel: z.number().int().min(0).max(100),

  suspenseLevel: z.number().min(0).max(10),
});

export const updateMovieSchema = createMovieSchema.partial();
