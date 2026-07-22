import { Series, SeriesRequest, SeriesUpdateRequest } from '../../types/Series';

export interface ISeriesRepository {
  findAll(): Promise<Series[]>;

  findById(id: number): Promise<Series | null>;

  create(series: SeriesRequest): Promise<Series>;

  update(id: number, series: SeriesUpdateRequest): Promise<Series | null>;

  delete(id: number): Promise<boolean>;
}
