import { useMutation, useQueryClient } from '@tanstack/react-query';
import { movieApi } from '../../api/movie/Movie';

export const useCreateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: movieApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};
