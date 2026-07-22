import { IAnimeRepository } from '../repositories/anime/IAnimeRepository';
import { AnimeService } from '../services/AnimeService';
import { Anime } from '../types/Anime';

const mockRepo: jest.Mocked<IAnimeRepository> = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const service = new AnimeService(mockRepo);

describe('AnimeService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return all anime', async () => {
    const animeList: Anime[] = [{ id: 1, title: 'Naruto' } as Anime];
    mockRepo.findAll.mockResolvedValue(animeList);

    const result = await service.getAllAnime();

    expect(result).toEqual([{ id: 1, title: 'Naruto' }]);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });

  test('should return anime by id', async () => {
    const anime: Anime = { id: 1, title: 'One Piece' } as Anime;
    mockRepo.findById.mockResolvedValue(anime);

    const result = await service.getAnimeById(1);

    expect(result.title).toBe('One Piece');
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
  });

  test('should throw error if anime not found', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(service.getAnimeById(999)).rejects.toThrow('Anime not found');
  });

  test('should create anime', async () => {
    const anime: Anime = { id: 1, title: 'Bleach' } as Anime;
    mockRepo.create.mockResolvedValue(anime);

    const result = await service.createAnime({
      title: 'Bleach',
      genre: 'Action',
      rating: 8,
      releaseYear: 2000,
      description: 'test',
      episodes: 1,
      status: 'ongoing',
      emotionLevel: 1,
      fightIntensity: 1,
      worldBuilding: 1,
      animationQuality: 1,
      fantasyLevel: 1,
    });

    expect(result).toEqual(anime);
    expect(mockRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Bleach' }),
    );
  });

  test('should update anime', async () => {
    const updated: Anime = { id: 1, title: 'Bleach Updated' } as Anime;

    mockRepo.update.mockResolvedValue(updated);

    const result = await service.updateAnime(1, { title: 'Bleach Updated' });

    expect(result.title).toBe('Bleach Updated');
  });

  test('should throw if update fails', async () => {
    mockRepo.update.mockResolvedValue(null);

    await expect(service.updateAnime(1, { title: 'x' })).rejects.toThrow(
      'Anime not found',
    );
  });

  test('should delete anime', async () => {
    mockRepo.delete.mockResolvedValue(true);

    const result = await service.deleteAnime(1);

    expect(result).toEqual({ success: true });
  });

  test('should throw if delete fails', async () => {
    mockRepo.delete.mockResolvedValue(false);

    await expect(service.deleteAnime(1)).rejects.toThrow('Anime not found');
  });
});
