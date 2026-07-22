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

  searchSeries: async (filters: any) => {
    const { sort, ...params } = filters;

    const { data } = await api.get('/recommendations/series/search', {
      params: {
        ...params,
        sort,
      },
    });

    return data;
  },

  recommendSeries: async (favorites: any[], filters: any = {}) => {
    const { data } = await api.post('/recommendations/series/score', {
      favorites,
      filters,
    });

    return data;
  },
};
