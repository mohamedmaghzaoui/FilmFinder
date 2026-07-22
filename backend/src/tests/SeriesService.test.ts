import { ISeriesRepository } from '../repositories/series/ISerieRepository';
import { SeriesService } from '../services/SeriesService';
import { Series } from '../types/Series';

const mockRepo: jest.Mocked<ISeriesRepository> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const service = new SeriesService(mockRepo);

describe('SeriesService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return all series', async () => {
    const seriesList: Series[] = [{ id: 1, title: 'Breaking Bad' } as Series];
    mockRepo.findAll.mockResolvedValue(seriesList);

    const result = await service.getAllSeries();

    expect(result).toEqual([{ id: 1, title: 'Breaking Bad' }]);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });

  test('should return series by id', async () => {
    const series: Series = { id: 1, title: 'Game of Thrones' } as Series;
    mockRepo.findById.mockResolvedValue(series);

    const result = await service.getSeriesById(1);

    expect(result.title).toBe('Game of Thrones');
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
  });

  test('should throw error if series not found', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(service.getSeriesById(999)).rejects.toThrow(
      'Series not found',
    );
  });

  test('should create series', async () => {
    const series: Series = { id: 1, title: 'Stranger Things' } as Series;
    mockRepo.create.mockResolvedValue(series);

    const result = await service.createSeries({
      title: 'Stranger Things',
      genre: 'Sci-Fi',
      rating: 8.4,
      releaseYear: 2016,
      description: 'test',
      seasons: 4,
      episodes: 34,
      characterDevelopment: 1,
      storyComplexity: 1,
      episodeAddiction: 1,
      dramaLevel: 1,
      humorLevel: 1,
    });

    expect(result).toEqual(series);
    expect(mockRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Stranger Things' }),
    );
  });

  test('should update series', async () => {
    const updated: Series = {
      id: 1,
      title: 'Stranger Things Updated',
    } as Series;

    mockRepo.update.mockResolvedValue(updated);

    const result = await service.updateSeries(1, {
      title: 'Stranger Things Updated',
    });

    expect(result.title).toBe('Stranger Things Updated');
  });

  test('should throw if update fails', async () => {
    mockRepo.update.mockResolvedValue(null);

    await expect(service.updateSeries(1, { title: 'x' })).rejects.toThrow(
      'Series not found',
    );
  });

  test('should delete series', async () => {
    mockRepo.delete.mockResolvedValue(true);

    const result = await service.deleteSeries(1);

    expect(result).toEqual({ success: true });
  });

  test('should throw if delete fails', async () => {
    mockRepo.delete.mockResolvedValue(false);

    await expect(service.deleteSeries(1)).rejects.toThrow('Series not found');
  });
});
