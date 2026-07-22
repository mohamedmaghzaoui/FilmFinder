import { useMutation } from '@tanstack/react-query';
import { seriesApi } from '../../api/series/Series';

export const useSeriesRecommendation = () => {
  return useMutation({
    mutationFn: ({ favorites, filters }: { favorites: any[]; filters: any }) =>
      seriesApi.recommendSeries(favorites, filters),
  });
};
