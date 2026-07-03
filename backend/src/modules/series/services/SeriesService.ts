import { ISeriesRepository } from '../repositories/ISerieRepository';
import { SeriesRequest, SeriesUpdateRequest } from '../types/Series';

export class SeriesService {
  constructor(private repo: ISeriesRepository) {}

  getAllSeries() {
    return this.repo.findAll();
  }

  async getSeriesById(id: number) {
    const series = await this.repo.findById(id);

    if (!series) {
      throw new Error('Series not found');
    }

    return series;
  }

  createSeries(data: SeriesRequest) {
    return this.repo.create(data);
  }

  async updateSeries(id: number, data: SeriesUpdateRequest) {
    const updated = await this.repo.update(id, data);

    if (!updated) {
      throw new Error('Series not found');
    }

    return updated;
  }

  async deleteSeries(id: number) {
    const deleted = await this.repo.delete(id);

    if (!deleted) {
      throw new Error('Series not found');
    }

    return { success: true };
  }
}
