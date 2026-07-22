export interface FilterStrategy<T> {
  filter(items: T[], options: any): T[];
}
