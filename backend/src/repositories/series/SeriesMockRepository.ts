import { seriesMock } from '../../mocks/Series';
import { Series, SeriesRequest, SeriesUpdateRequest } from '../../types/Series';
import { ISeriesRepository } from './ISerieRepository';

export class SeriesMockRepository implements ISeriesRepository {
  async findAll(): Promise<Series[]> {
    return seriesMock;
  }

  async findById(id: number): Promise<Series | null> {
    return seriesMock.find((s) => s.id === id) ?? null;
  }

  async create(data: SeriesRequest): Promise<Series> {
    const newSeries: Series = {
      id: seriesMock.length + 1,
      ...data,
    };

    seriesMock.push(newSeries);

    return newSeries;
  }

  async update(id: number, data: SeriesUpdateRequest): Promise<Series | null> {
    const index = seriesMock.findIndex((s) => s.id === id);

    if (index === -1) return null;

    seriesMock[index] = {
      ...seriesMock[index],
      ...data,
    };

    return seriesMock[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = seriesMock.findIndex((s) => s.id === id);

    if (index === -1) return false;

    seriesMock.splice(index, 1);

    return true;
  }
}
