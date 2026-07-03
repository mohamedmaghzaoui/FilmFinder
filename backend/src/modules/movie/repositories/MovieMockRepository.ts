import { IMovieRepository } from './IMovieRepository';

import { Movie, MovieRequest, MovieUpdateRequest } from '../types/Movies';

import { moviesMock } from '../mocks/Movies';

export class MovieMockRepository implements IMovieRepository {
  async findAll(): Promise<Movie[]> {
    return moviesMock;
  }

  async findById(id: number): Promise<Movie | null> {
    return moviesMock.find((movie) => movie.id === id) ?? null;
  }

  async create(movie: MovieRequest): Promise<Movie> {
    const newMovie: Movie = {
      id: moviesMock.length + 1,
      ...movie,
    };

    moviesMock.push(newMovie);

    return newMovie;
  }

  async update(id: number, movie: MovieUpdateRequest): Promise<Movie | null> {
    const index = moviesMock.findIndex((movie) => movie.id === id);

    if (index === -1) {
      return null;
    }

    moviesMock[index] = {
      ...moviesMock[index],
      ...movie,
    };

    return moviesMock[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = moviesMock.findIndex((movie) => movie.id === id);

    if (index === -1) {
      return false;
    }

    moviesMock.splice(index, 1);

    return true;
  }
}
