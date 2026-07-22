import { useMutation, useQueryClient } from '@tanstack/react-query';
import { movieApi } from '../../api/movie/Movie';

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: movieApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};
