import { useMutation } from '@tanstack/react-query';
import { seriesApi } from '../../api/series/Series';

export const useSeriesSearch = () => {
  return useMutation({
    mutationFn: (filters: any) => {
      return seriesApi.searchSeries(filters);
    },
  });
};
