import { z } from "zod";

export const createAnimeSchema = z.object({
  title: z.string().min(1, "Title is required"),

  genre: z.string().min(1, "Genre is required"),

  episodes: z.number().int().positive(),

  rating: z.number().min(0).max(5),

  releaseYear: z.number().int(),

  status: z.enum(["ongoing", "finished"]),

  description: z.string().min(1, "Description is required"),
});

export const updateAnimeSchema = createAnimeSchema.partial();
