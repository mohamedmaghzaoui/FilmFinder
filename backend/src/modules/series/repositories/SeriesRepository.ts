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
    await db.insert(series).values(data);

    const result = await db.select().from(series).orderBy(series.id);

    return result[result.length - 1];
  }

  async update(id: number, data: SeriesUpdateRequest): Promise<Series | null> {
    await db.update(series).set(data).where(eq(series.id, id));

    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    await db.delete(series).where(eq(series.id, id));
    return true;
  }
}
