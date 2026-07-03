import { Anime, AnimeRequest, AnimeUpdateRequest } from "../types/Anime";

export interface IAnimeRepository {
  findAll(): Promise<Anime[]>;

  findById(id: number): Promise<Anime | null>;

  create(anime: AnimeRequest): Promise<Anime>;

  update(id: number, anime: AnimeUpdateRequest): Promise<Anime | null>;

  delete(id: number): Promise<boolean>;
}
