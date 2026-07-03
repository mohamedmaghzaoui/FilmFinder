import type { Series } from '../../types/Series';
import { api } from '../axios';

export const seriesApi = {
  getAll: async (): Promise<Series[]> => {
    const { data } = await api.get('/series');
    return data;
  },

  getById: async (id: number): Promise<Series> => {
    const { data } = await api.get(`/series/${id}`);
    return data;
  },
};
