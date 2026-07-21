import { IAnimeRepository } from '../repositories/anime/IAnimeRepository';
import { AnimeRequest, AnimeUpdateRequest } from '../types/Anime';

export class AnimeService {
  constructor(private animeRepository: IAnimeRepository) {}

  getAllAnime() {
    return this.animeRepository.findAll();
  }

  async getAnimeById(id: number) {
    const anime = await this.animeRepository.findById(id);

    if (!anime) {
      throw new Error('Anime not found');
    }

    return anime;
  }

  createAnime(data: AnimeRequest) {
    return this.animeRepository.create(data);
  }

  async updateAnime(id: number, data: AnimeUpdateRequest) {
    const updated = await this.animeRepository.update(id, data);

    if (!updated) {
      throw new Error('Anime not found');
    }

    return updated;
  }

  async deleteAnime(id: number) {
    const deleted = await this.animeRepository.delete(id);

    if (!deleted) {
      throw new Error('Anime not found');
    }

    return { success: true };
  }
}
