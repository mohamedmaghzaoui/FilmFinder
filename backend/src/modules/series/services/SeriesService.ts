import { ISeriesRepository } from '../repositories/ISerieRepository';
import { SeriesRequest, SeriesUpdateRequest } from '../types/Series';

export class SeriesService {
  constructor(private seriesRepository: ISeriesRepository) {}

  getAllSeries() {
    return this.seriesRepository.findAll();
  }

  async getSeriesById(id: number) {
    const series = await this.seriesRepository.findById(id);

    if (!series) {
      throw new Error('Series not found');
    }

    return series;
  }

  createSeries(data: SeriesRequest) {
    return this.seriesRepository.create(data);
  }

  async updateSeries(id: number, data: SeriesUpdateRequest) {
    const updated = await this.seriesRepository.update(id, data);

    if (!updated) {
      throw new Error('Series not found');
    }

    return updated;
  }

  async deleteSeries(id: number) {
    const deleted = await this.seriesRepository.delete(id);

    if (!deleted) {
      throw new Error('Series not found');
    }

    return { success: true };
  }
}
