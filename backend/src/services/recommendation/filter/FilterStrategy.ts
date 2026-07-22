import { RecommendationFilters } from '../../../types/Recommendation';

export interface FilterStrategy<T> {
  filter(items: T[], options: RecommendationFilters): T[];
}
