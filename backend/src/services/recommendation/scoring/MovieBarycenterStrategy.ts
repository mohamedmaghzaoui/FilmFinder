import { ScoringStrategy } from './ScoringStrategy';
import { Movie } from '../../../types/Movie';

export class MovieBarycenterStrategy implements ScoringStrategy<Movie> {
  score(item: Movie, favorites: Movie[]) {
    const profile = {
      actionIntensity: this.normalize(this.avg(favorites, 'actionIntensity')),
      storyDepth: this.normalize(this.avg(favorites, 'storyDepth')),
      visualQuality: this.normalize(this.avg(favorites, 'visualQuality')),
      emotionLevel: this.normalize(this.avg(favorites, 'emotionLevel')),
      suspenseLevel: this.normalize(this.avg(favorites, 'suspenseLevel')),
    };

    const normalizedMovie = {
      actionIntensity: this.normalize(Number(item.actionIntensity)),
      storyDepth: this.normalize(Number(item.storyDepth)),
      visualQuality: this.normalize(Number(item.visualQuality)),
      emotionLevel: this.normalize(Number(item.emotionLevel)),
      suspenseLevel: this.normalize(Number(item.suspenseLevel)),
    };

    const distance = Math.sqrt(
      (normalizedMovie.actionIntensity - profile.actionIntensity) ** 2 +
        (normalizedMovie.storyDepth - profile.storyDepth) ** 2 +
        (normalizedMovie.visualQuality - profile.visualQuality) ** 2 +
        (normalizedMovie.emotionLevel - profile.emotionLevel) ** 2 +
        (normalizedMovie.suspenseLevel - profile.suspenseLevel) ** 2,
    );

    return 1 / (1 + distance);
  }

  private avg(items: Movie[], key: keyof Movie) {
    return (
      items.reduce((sum, item) => sum + Number(item[key]), 0) / items.length
    );
  }

  private normalize(value: number): number {
    return value / 10;
  }
}
