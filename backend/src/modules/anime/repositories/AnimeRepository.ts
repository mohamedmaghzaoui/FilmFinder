import { eq } from "drizzle-orm";

import { db } from "../../../db";
import { anime } from "../../../db/schema";

import { IAnimeRepository } from "./IAnimeRepository";
import { Anime, AnimeRequest, AnimeUpdateRequest } from "../types/Anime";

export class AnimeRepository implements IAnimeRepository {
  async findAll(): Promise<Anime[]> {
    return db.select().from(anime);
  }

  async findById(id: number): Promise<Anime | null> {
    const result = await db.select().from(anime).where(eq(anime.id, id));

    return result[0] ?? null;
  }

  async create(data: AnimeRequest): Promise<Anime> {
    await db.insert(anime).values(data);

    const result = await db.select().from(anime).orderBy(anime.id);

    return result[result.length - 1];
  }

  async update(id: number, data: AnimeUpdateRequest): Promise<Anime | null> {
    await db.update(anime).set(data).where(eq(anime.id, id));

    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    await db.delete(anime).where(eq(anime.id, id));
    return true;
  }
}
