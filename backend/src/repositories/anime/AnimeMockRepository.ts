import { animeMock } from '../../mocks/Anime';
import { Anime, AnimeRequest, AnimeUpdateRequest } from '../../types/Anime';

import { IAnimeRepository } from './IAnimeRepository';

export class AnimeMockRepository implements IAnimeRepository {
  async findAll(): Promise<Anime[]> {
    return animeMock;
  }

  async findById(id: number): Promise<Anime | null> {
    return animeMock.find((anime) => anime.id === id) ?? null;
  }

  async create(data: AnimeRequest): Promise<Anime> {
    const newAnime: Anime = {
      id: animeMock.length + 1,
      ...data,
    };

    animeMock.push(newAnime);

    return newAnime;
  }

  async update(id: number, data: AnimeUpdateRequest): Promise<Anime | null> {
    const index = animeMock.findIndex((anime) => anime.id === id);

    if (index === -1) return null;

    animeMock[index] = {
      ...animeMock[index],
      ...data,
    };

    return animeMock[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = animeMock.findIndex((anime) => anime.id === id);

    if (index === -1) return false;

    animeMock.splice(index, 1);

    return true;
  }
}
