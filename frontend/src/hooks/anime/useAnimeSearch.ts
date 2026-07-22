import { useMutation } from '@tanstack/react-query';
import { animeApi } from '../../api/anime/Anime';

export const useAnimeSearch = () => {
  return useMutation({
    mutationFn: (filters: any) => {
      return animeApi.searchAnime(filters);
    },
  });
};
