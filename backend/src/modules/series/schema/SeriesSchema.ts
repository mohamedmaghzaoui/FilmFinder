import { z } from 'zod';

export const createSeriesSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  genre: z.string().min(1, 'Genre is required'),
  seasons: z.number().int().positive(),
  episodes: z.number().int().positive(),
  rating: z.number().min(0).max(10, 'Rating must be between 0 and 10'),
  releaseYear: z.number().int(),
  description: z.string().min(1, 'Description is required'),
});

export const updateSeriesSchema = createSeriesSchema.partial();
