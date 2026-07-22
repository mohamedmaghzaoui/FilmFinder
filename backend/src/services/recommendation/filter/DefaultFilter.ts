import {
  RecommendationFilters,
  RecommendationItem,
} from '../../../types/Recommendation';
import { FilterStrategy } from './FilterStrategy';

export class DefaultFilter<
  T extends RecommendationItem,
> implements FilterStrategy<T> {
  filter(items: T[], options: RecommendationFilters): T[] {
    return items.filter((item) => {
      if (options.genre && item.genre !== options.genre) return false;

      if (
        options.rating !== undefined &&
        item.rating !== undefined &&
        item.rating < options.rating
      )
        return false;

      if (
        options.releaseYear !== undefined &&
        item.releaseYear !== undefined &&
        item.releaseYear < options.releaseYear
      )
        return false;

      return true;
    });
  }
}
