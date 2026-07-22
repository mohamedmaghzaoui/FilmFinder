import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../../api/movie/Movie';

export const useMovie = (id: number) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => movieApi.getById(id),
    enabled: !!id,
  });
};
