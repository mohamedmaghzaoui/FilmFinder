import { useMutation, useQueryClient } from '@tanstack/react-query';
import { movieApi } from '../../api/movie/Movie';

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => movieApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};
