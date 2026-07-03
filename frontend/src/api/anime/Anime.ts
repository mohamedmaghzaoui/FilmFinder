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
};
