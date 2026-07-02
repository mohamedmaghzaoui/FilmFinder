import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1),
  genre: z.string().min(1),
  duration: z.number().int().positive(),
  rating: z.number().min(0).max(10),
  releaseYear: z.number().int(),
  description: z.string().min(1),
});
export const updateMovieSchema = z.object({
  title: z.string().min(1).optional(),
  genre: z.string().min(1).optional(),
  duration: z.number().int().positive().optional(),
  rating: z.number().min(0).max(10).optional(),
  releaseYear: z.number().int().optional(),
  description: z.string().min(1).optional(),
});
