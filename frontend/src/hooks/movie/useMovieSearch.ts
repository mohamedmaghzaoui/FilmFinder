import { useMutation } from '@tanstack/react-query';
import { movieApi } from '../../api/movie/Movie';

export const useMovieSearch = () => {
  return useMutation({
    mutationFn: (filters: any) => {
      return movieApi.searchMovies(filters);
    },
  });
};
