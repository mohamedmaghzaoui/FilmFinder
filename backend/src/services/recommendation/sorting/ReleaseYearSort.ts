import { SortStrategy } from './SortStrategy';

export class ReleaseYearSort implements SortStrategy<any> {
  sort(items: any[]) {
    return items.sort((a, b) => b.releaseYear - a.releaseYear);
  }
}
