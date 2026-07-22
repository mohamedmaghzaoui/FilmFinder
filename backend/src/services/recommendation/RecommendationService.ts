import {
  RecommendationFilters,
  RecommendationRepository,
} from '../../types/Recommendation';
import { FilterStrategy } from './filter/FilterStrategy';
import { ScoringStrategy } from './scoring/ScoringStrategy';
import { SortStrategy } from './sorting/SortStrategy';

export class RecommendationService<T> {
  constructor(
    private repository: RecommendationRepository<T>,

    private filterStrategy: FilterStrategy<T>,

    private scoringStrategy: ScoringStrategy<T>,

    private sortStrategies: Record<string, SortStrategy<any>>,
  ) {}

  // classic search
  async search(filters: RecommendationFilters, sortType: string) {
    let items = await this.repository.findAll();

    items = this.filterStrategy.filter(items, filters);
    if (!sortType) {
      return items;
    }

    const sortStrategy = this.sortStrategies[sortType];

    if (!sortStrategy) {
      throw new Error('Invalid sort type');
    }

    return sortStrategy.sort(items);
  }

  //  barycentre
  async recommend(favorites: any[], filters: RecommendationFilters = {}) {
    let items = await this.repository.findAll();

    items = this.filterStrategy.filter(items, filters);

    const scoredItems = items.map((item: any) => ({
      ...item,
      score: this.scoringStrategy.score(item, favorites),
    }));

    return this.sortStrategies.score.sort(scoredItems);
  }
}
