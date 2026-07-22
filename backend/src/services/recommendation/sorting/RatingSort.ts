import { SortStrategy } from './SortStrategy';

export class RatingSort implements SortStrategy<any> {
  sort(items: any[]) {
    return items.sort((a, b) => b.rating - a.rating);
  }
}
