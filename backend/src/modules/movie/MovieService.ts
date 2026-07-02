import { MovieRepository } from './movieRepository';
import { MovieRequest, MovieUpdateRequest } from './types/movies';

export class MovieService {
  constructor(private repo: MovieRepository) {}

  getAllMovies() {
    return this.repo.findAll();
  }

  async getMovieById(id: number) {
    const movie = await this.repo.findById(id);

    if (!movie) {
      throw new Error('Movie not found');
    }

    return movie;
  }

  createMovie(movie: MovieRequest) {
    return this.repo.create(movie);
  }

  async updateMovie(id: number, movie: MovieUpdateRequest) {
    const updated = await this.repo.update(id, movie);

    if (!updated) {
      throw new Error('Movie not found');
    }

    return updated;
  }

  async deleteMovie(id: number) {
    const deleted = await this.repo.delete(id);

    if (!deleted) {
      throw new Error('Movie not found');
    }

    return { success: true };
  }
}
