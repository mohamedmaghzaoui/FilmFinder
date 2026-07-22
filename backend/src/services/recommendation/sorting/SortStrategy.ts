export interface SortStrategy<T> {
  sort(items: T[]): T[];
}
