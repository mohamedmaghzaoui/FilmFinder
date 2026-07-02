import { eq } from "drizzle-orm";

import { db, movies } from "../../../db";

import { IMovieRepository } from "./IMovieRepository";
import { Movie, MovieRequest, MovieUpdateRequest } from "../types/Movies";

export class MovieRepository implements IMovieRepository {
  async findAll(): Promise<Movie[]> {
    return db.select().from(movies);
  }

  async findById(id: number): Promise<Movie | null> {
    const result = await db.select().from(movies).where(eq(movies.id, id));

    return result[0] ?? null;
  }

  async create(movie: MovieRequest): Promise<Movie> {
    await db.insert(movies).values(movie);

    const result = await db.select().from(movies).orderBy(movies.id);

    return result[result.length - 1];
  }

  async update(id: number, movie: MovieUpdateRequest): Promise<Movie | null> {
    await db.update(movies).set(movie).where(eq(movies.id, id));

    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    await db.delete(movies).where(eq(movies.id, id));

    return true;
  }
}
