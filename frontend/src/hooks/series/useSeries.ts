import { useQuery } from '@tanstack/react-query';
import { seriesApi } from '../../api/series/Series';

export const useSeries = () => {
  return useQuery({
    queryKey: ['series'],
    queryFn: seriesApi.getAll,
  });
};
