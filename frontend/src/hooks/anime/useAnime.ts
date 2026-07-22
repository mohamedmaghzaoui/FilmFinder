import { useQuery } from '@tanstack/react-query';
import { animeApi } from '../../api/anime/Anime';

export const useAnime = () => {
  return useQuery({
    queryKey: ['anime'],
    queryFn: animeApi.getAll,
  });
};
