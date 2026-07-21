import { Movie, MovieRequest, MovieUpdateRequest } from '../../types/Movie';

export interface IMovieRepository {
  findAll(): Promise<Movie[]>;

  findById(id: number): Promise<Movie | null>;

  create(movie: MovieRequest): Promise<Movie>;

  update(id: number, movie: MovieUpdateRequest): Promise<Movie | null>;

  delete(id: number): Promise<boolean>;
}
