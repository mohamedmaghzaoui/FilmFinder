import { eq } from 'drizzle-orm';

import { db, movies } from '../../db';

import { isMock } from '../../config/dataSource';

import { moviesMock } from './mocks/movies';

import { Movie, MovieRequest, MovieUpdateRequest } from './types/movies';

export class MovieRepository {
  async findAll(): Promise<Movie[]> {
    if (isMock()) {
      return moviesMock;
    }

    return db.select().from(movies);
  }

  async findById(id: number): Promise<Movie | null> {
    if (isMock()) {
      return moviesMock.find((movie) => movie.id === id) ?? null;
    }

    const result = await db.select().from(movies).where(eq(movies.id, id));

    return result[0] ?? null;
  }

  async create(movie: MovieRequest): Promise<Movie> {
    if (isMock()) {
      const newMovie: Movie = {
        id: moviesMock.length + 1,

        ...movie,
      };

      moviesMock.push(newMovie);

      return newMovie;
    }

    await db.insert(movies).values(movie);

    const result = await db.select().from(movies).orderBy(movies.id);

    return result[result.length - 1];
  }

  async update(id: number, movie: MovieUpdateRequest): Promise<Movie | null> {
    if (isMock()) {
      const index = moviesMock.findIndex((m) => m.id === id);

      if (index === -1) {
        return null;
      }

      moviesMock[index] = {
        ...moviesMock[index],
        ...movie,
      };

      return moviesMock[index];
    }

    await db.update(movies).set(movie).where(eq(movies.id, id));

    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    if (isMock()) {
      const index = moviesMock.findIndex((m) => m.id === id);

      if (index === -1) {
        return false;
      }

      moviesMock.splice(index, 1);

      return true;
    }

    await db.delete(movies).where(eq(movies.id, id));

    return true;
  }
}
