import { eq } from 'drizzle-orm';
import { IAnimeRepository } from './IAnimeRepository';
import { Anime, AnimeRequest, AnimeUpdateRequest } from '../../types/Anime';
import { anime, db } from '../../db';

export class AnimeRepository implements IAnimeRepository {
  async findAll(): Promise<Anime[]> {
    return db.select().from(anime);
  }

  async findById(id: number): Promise<Anime | null> {
    const result = await db.select().from(anime).where(eq(anime.id, id));

    return result[0] ?? null;
  }

  async create(data: AnimeRequest): Promise<Anime> {
    const result = await db.insert(anime).values(data);
    const id = Number(result.lastInsertRowid);
    const created = await this.findById(id);
    if (!created) {
      throw new Error('Failed to create anime');
    }
    return created;
  }

  async update(id: number, data: AnimeUpdateRequest): Promise<Anime | null> {
    const existing = await this.findById(id);
    if (!existing) return null;
    await db.update(anime).set(data).where(eq(anime.id, id));

    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const existing = await this.findById(id);
    if (!existing) return false;
    await db.delete(anime).where(eq(anime.id, id));
    return true;
  }
}
