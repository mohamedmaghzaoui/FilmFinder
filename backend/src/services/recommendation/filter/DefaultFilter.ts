import { FilterStrategy } from './FilterStrategy';

export class DefaultFilter<
  T extends {
    genre: string;
    rating: number;
    releaseYear: number;
  },
> implements FilterStrategy<T> {
  filter(items: T[], options: any): T[] {
    return items.filter((item) => {
      if (options.genre && item.genre !== options.genre) return false;

      if (options.rating && item.rating < options.rating) return false;

      if (options.releaseYear && item.releaseYear < options.releaseYear)
        return false;

      return true;
    });
  }
}
