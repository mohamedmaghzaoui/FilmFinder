import { useQuery } from '@tanstack/react-query';
import { animeApi } from '../../api/anime/Anime';

export const useAnimeItem = (id: number) => {
  return useQuery({
    queryKey: ['anime', id],
    queryFn: () => animeApi.getById(id),
    enabled: !!id,
  });
};
