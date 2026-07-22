import type { Anime } from '../../types/Anime';
import { api } from '../axios';

export const animeApi = {
  getAll: async (): Promise<Anime[]> => {
    const { data } = await api.get('/anime');
    return data;
  },

  getById: async (id: number): Promise<Anime> => {
    const { data } = await api.get(`/anime/${id}`);
    return data;
  },

  searchAnime: async (filters: any) => {
    const { sort, ...params } = filters;

    const { data } = await api.get('/recommendations/anime/search', {
      params: {
        ...params,
        sort,
      },
    });

    return data;
  },

  recommendAnime: async (favorites: any[], filters: any = {}) => {
    const { data } = await api.post('/recommendations/anime/score', {
      favorites,
      filters,
    });

    return data;
  },
};
