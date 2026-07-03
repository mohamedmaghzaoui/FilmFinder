import { IAnimeRepository } from "../repositories/IAnimeRepository";
import { AnimeRequest, AnimeUpdateRequest } from "../types/Anime";

export class AnimeService {
  constructor(private repo: IAnimeRepository) {}

  getAllAnime() {
    return this.repo.findAll();
  }

  async getAnimeById(id: number) {
    const anime = await this.repo.findById(id);

    if (!anime) {
      throw new Error("Anime not found");
    }

    return anime;
  }

  createAnime(data: AnimeRequest) {
    return this.repo.create(data);
  }

  async updateAnime(id: number, data: AnimeUpdateRequest) {
    const updated = await this.repo.update(id, data);

    if (!updated) {
      throw new Error("Anime not found");
    }

    return updated;
  }

  async deleteAnime(id: number) {
    const deleted = await this.repo.delete(id);

    if (!deleted) {
      throw new Error("Anime not found");
    }

    return { success: true };
  }
}
