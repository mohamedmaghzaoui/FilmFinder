import { SortStrategy } from './SortStrategy';

export class ScoreSort implements SortStrategy<any> {
  sort(items: any[]) {
    return items.sort((a, b) => b.score - a.score);
  }
}
