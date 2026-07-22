import { useMutation } from '@tanstack/react-query';
import { animeApi } from '../../api/anime/Anime';

export const useAnimeRecommendation = () => {
  return useMutation({
    mutationFn: ({ favorites, filters }: { favorites: any[]; filters: any }) =>
      animeApi.recommendAnime(favorites, filters),
  });
};
