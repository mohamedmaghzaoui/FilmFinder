import { IAnimeRepository } from '../repositories/anime/IAnimeRepository';
import { AnimeService } from '../services/AnimeService';

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
    mockRepo.findAll.mockResolvedValue([{ id: 1, title: 'Naruto' } as any]);

    const result = await service.getAllAnime();

    expect(result).toEqual([{ id: 1, title: 'Naruto' }]);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });

  test('should return anime by id', async () => {
    mockRepo.findById.mockResolvedValue({ id: 1, title: 'One Piece' } as any);

    const result = await service.getAnimeById(1);

    expect(result.title).toBe('One Piece');
    expect(mockRepo.findById).toHaveBeenCalledWith(1);
  });

  test('should throw error if anime not found', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(service.getAnimeById(999)).rejects.toThrow('Anime not found');
  });

  test('should create anime', async () => {
    const anime = { id: 1, title: 'Bleach' };
    mockRepo.create.mockResolvedValue(anime as any);

    const result = await service.createAnime({ title: 'Bleach' } as any);

    expect(result).toEqual(anime);
    expect(mockRepo.create).toHaveBeenCalledWith({ title: 'Bleach' });
  });

  test('should update anime', async () => {
    const updated = { id: 1, title: 'Bleach Updated' };

    mockRepo.update.mockResolvedValue(updated as any);

    const result = await service.updateAnime(1, { title: 'Bleach Updated' });

    expect(result.title).toBe('Bleach Updated');
  });

  test('should throw if update fails', async () => {
    mockRepo.update.mockResolvedValue(null);

    await expect(service.updateAnime(1, { title: 'x' } as any)).rejects.toThrow(
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
