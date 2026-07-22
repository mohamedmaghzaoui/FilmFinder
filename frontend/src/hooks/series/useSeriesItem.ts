import { useQuery } from '@tanstack/react-query';
import { seriesApi } from '../../api/series/Series';

export const useSeriesItem = (id: number) => {
  return useQuery({
    queryKey: ['seriesItem', id],
    queryFn: () => seriesApi.getById(id),
    enabled: !!id,
  });
};
