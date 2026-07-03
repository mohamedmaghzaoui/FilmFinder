import { eq } from 'drizzle-orm';

import { db, movies } from '../../../db';

import { IMovieRepository } from './IMovieRepository';
import { Movie, MovieRequest, MovieUpdateRequest } from '../types/Movies';

export class MovieRepository implements IMovieRepository {
  async findAll(): Promise<Movie[]> {
    return db.select().from(movies);
  }

  async findById(id: number): Promise<Movie | null> {
    const result = await db.select().from(movies).where(eq(movies.id, id));

    return result[0] ?? null;
  }

  async create(movie: MovieRequest): Promise<Movie> {
    const result = await db.insert(movies).values(movie);
    const id = Number(result.lastInsertRowid);
    const created = await this.findById(id);

    if (!created) {
      throw new Error('Failed to create movie');
    }

    return created;
  }

  async update(id: number, movie: MovieUpdateRequest): Promise<Movie | null> {
    const existing = await this.findById(id);
    if (!existing) return null;
    await db.update(movies).set(movie).where(eq(movies.id, id));

    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const existing = await this.findById(id);
    if (!existing) return false;
    await db.delete(movies).where(eq(movies.id, id));

    return true;
  }
}
