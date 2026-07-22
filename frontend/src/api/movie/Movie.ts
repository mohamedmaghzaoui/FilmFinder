import type { Movie } from '../../types/Movie';
import { api } from '../axios';

export const movieApi = {
  getAll: async (): Promise<Movie[]> => {
    const { data } = await api.get('/movies');
    return data;
  },

  getById: async (id: number): Promise<Movie> => {
    const { data } = await api.get(`/movies/${id}`);
    return data;
  },

  create: async (movie: Partial<Movie>) => {
    const { data } = await api.post('/movies', movie);
    return data;
  },

  update: async (id: number, movie: Partial<Movie>) => {
    const { data } = await api.put(`/movies/${id}`, movie);
    return data;
  },

  remove: async (id: number) => {
    const { data } = await api.delete(`/movies/${id}`);
    return data;
  },

  searchMovies: async (filters: any) => {
    const { sort, ...params } = filters;

    const { data } = await api.get('/recommendations/movie/search', {
      params: {
        ...params,
        sort,
      },
    });

    return data;
  },

  recommendMovies: async (favorites: any[], filters: any = {}) => {
    const { data } = await api.post('/recommendations/movie/score', {
      favorites,
      filters,
    });

    return data;
  },
};
