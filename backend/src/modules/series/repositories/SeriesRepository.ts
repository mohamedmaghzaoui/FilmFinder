import { eq } from 'drizzle-orm';
import { db } from '../../../db';
import { series } from '../../../db/schema';

import { Series, SeriesRequest, SeriesUpdateRequest } from '../types/Series';
import { ISeriesRepository } from './ISerieRepository';

export class SeriesRepository implements ISeriesRepository {
  async findAll(): Promise<Series[]> {
    return db.select().from(series);
  }

  async findById(id: number): Promise<Series | null> {
    const result = await db.select().from(series).where(eq(series.id, id));
    return result[0] ?? null;
  }

  async create(data: SeriesRequest): Promise<Series> {
    const result = await db.insert(series).values(data);
    const insertId = Number(result.lastInsertRowid);
    const created = await this.findById(insertId);
    if (!created) {
      throw new Error('Failed to create series');
    }
    return created;
  }

  async update(id: number, data: SeriesUpdateRequest): Promise<Series | null> {
    const existing = await this.findById(id);
    if (!existing) return null;
    await db.update(series).set(data).where(eq(series.id, id));

    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const existing = await this.findById(id);
    if (!existing) return false;
    await db.delete(series).where(eq(series.id, id));
    return true;
  }
}
