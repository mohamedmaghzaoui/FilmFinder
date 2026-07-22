import { ScoringStrategy } from './ScoringStrategy';
import { Movie } from '../../../types/Movie';

export class MovieBarycenterStrategy implements ScoringStrategy<Movie> {
  score(item: Movie, favorites: Movie[]) {
    const profile = {
      actionIntensity: this.normalize(
        this.avg(favorites, 'actionIntensity'),
        0,
        100,
      ),
      storyDepth: this.normalize(this.avg(favorites, 'storyDepth'), 0, 10),
      visualQuality: this.normalize(this.avg(favorites, 'visualQuality'), 0, 5),
      emotionLevel: this.normalize(this.avg(favorites, 'emotionLevel'), 0, 100),
      suspenseLevel: this.normalize(
        this.avg(favorites, 'suspenseLevel'),
        0,
        10,
      ),
    };

    const normalizedMovie = {
      actionIntensity: this.normalize(Number(item.actionIntensity), 0, 100),
      storyDepth: this.normalize(Number(item.storyDepth), 0, 10),
      visualQuality: this.normalize(Number(item.visualQuality), 0, 5),
      emotionLevel: this.normalize(Number(item.emotionLevel), 0, 100),
      suspenseLevel: this.normalize(Number(item.suspenseLevel), 0, 10),
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

  private normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min);
  }
}
