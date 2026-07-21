import { IMovieRepository } from '../repositories/movie/IMovieRepository';
import { MovieRequest, MovieUpdateRequest } from '../types/Movie';

export class MovieService {
  constructor(private movieRepository: IMovieRepository) {}

  getAllMovies() {
    return this.movieRepository.findAll();
  }

  async getMovieById(id: number) {
    const movie = await this.movieRepository.findById(id);

    if (!movie) {
      throw new Error('Movie not found');
    }

    return movie;
  }

  createMovie(movie: MovieRequest) {
    return this.movieRepository.create(movie);
  }

  async updateMovie(id: number, movie: MovieUpdateRequest) {
    const updated = await this.movieRepository.update(id, movie);

    if (!updated) {
      throw new Error('Movie not found');
    }

    return updated;
  }

  async deleteMovie(id: number) {
    const deleted = await this.movieRepository.delete(id);

    if (!deleted) {
      throw new Error('Movie not found');
    }

    return { success: true };
  }
}
