export interface ScoringStrategy<T> {
  score(item: T, favorites?: T[]): number;
}
