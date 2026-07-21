import { z } from 'zod';

export const createAnimeSchema = z.object({
  title: z.string().min(1),

  genre: z.string().min(1),

  episodes: z.number().int().positive(),

  rating: z.number().min(0).max(10),

  releaseYear: z.number().int(),

  status: z.enum(['ongoing', 'finished']),

  description: z.string().min(1),

  // Recommendation

  fightIntensity: z.number().int().min(0).max(100),

  worldBuilding: z.number().min(0).max(10),

  animationQuality: z.number().min(0).max(5),

  emotionLevel: z.number().min(0).max(10),

  fantasyLevel: z.number().int().min(0).max(100),
});

export const updateAnimeSchema = createAnimeSchema.partial();
