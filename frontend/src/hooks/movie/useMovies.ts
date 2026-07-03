import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../../api/movie/Movie';

export const useMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: movieApi.getAll,
  });
};
