import { IMovieRepository } from '../repositories/movie/IMovieRepository';
import { MovieService } from '../services/MovieService';
import { Movie } from '../types/Movie';

const mockRepo: jest.Mocked<IMovieRepository> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const service = new MovieService(mockRepo);

describe('MovieService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return all movies', async () => {
    const movieList: Movie[] = [{ id: 1, title: 'Inception' } as Movie];
    mockRepo.findAll.mockResolvedValue(movieList);

    const result = await service.getAllMovies();

    expect(result).toEqual([{ id: 1, title: 'Inception' }]);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });

  test('should return movie by id', async () => {
    const movie: Movie = { id: 1, title: 'Interstellar' } as Movie;
    mockRepo.findById.mockResolvedValue(movie);

    const result = await service.getMovieById(1);

    expect(result.title).toBe('Interstellar');
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
  });

  test('should throw error if movie not found', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(service.getMovieById(999)).rejects.toThrow('Movie not found');
  });

  test('should create movie', async () => {
    const movie: Movie = { id: 1, title: 'Dune' } as Movie;
    mockRepo.create.mockResolvedValue(movie);

    const result = await service.createMovie({
      title: 'Dune',
      genre: 'Sci-Fi',
      rating: 8.5,
      releaseYear: 2021,
      description: 'test',
      duration: 155,
      actionIntensity: 1,
      storyDepth: 1,
      visualQuality: 1,
      emotionLevel: 1,
      suspenseLevel: 1,
    });

    expect(result).toEqual(movie);
    expect(mockRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Dune' }),
    );
  });

  test('should update movie', async () => {
    const updated: Movie = { id: 1, title: 'Dune Updated' } as Movie;

    mockRepo.update.mockResolvedValue(updated);

    const result = await service.updateMovie(1, { title: 'Dune Updated' });

    expect(result.title).toBe('Dune Updated');
  });

  test('should throw if update fails', async () => {
    mockRepo.update.mockResolvedValue(null);

    await expect(service.updateMovie(1, { title: 'x' })).rejects.toThrow(
      'Movie not found',
    );
  });

  test('should delete movie', async () => {
    mockRepo.delete.mockResolvedValue(true);

    const result = await service.deleteMovie(1);

    expect(result).toEqual({ success: true });
  });

  test('should throw if delete fails', async () => {
    mockRepo.delete.mockResolvedValue(false);

    await expect(service.deleteMovie(1)).rejects.toThrow('Movie not found');
  });
});
