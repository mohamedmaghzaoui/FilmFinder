import { useMutation } from '@tanstack/react-query';
import { movieApi } from '../../api/movie/Movie';

export const useMovieRecommendation = () => {
  return useMutation({
    mutationFn: ({ favorites, filters }: { favorites: any[]; filters: any }) =>
      movieApi.recommendMovies(favorites, filters),
  });
};
