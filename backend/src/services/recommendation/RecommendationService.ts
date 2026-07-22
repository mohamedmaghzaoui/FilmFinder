export class RecommendationService {
  constructor(
    private repository: any,

    private filterStrategy: any,

    private scoringStrategy: any,

    private sortStrategies: any,
  ) {}

  // Recherche classique
  async search(filters: any, sortType: string) {
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

  // Recommandation barycentre
  async recommend(favorites: any[], filters: any = {}) {
    let items = await this.repository.findAll();

    items = this.filterStrategy.filter(items, filters);

    const scoredItems = items.map((item: any) => ({
      ...item,
      score: this.scoringStrategy.score(item, favorites),
    }));

    return this.sortStrategies.score.sort(scoredItems);
  }
}
