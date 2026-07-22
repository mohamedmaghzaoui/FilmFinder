import { ScoringStrategy } from './ScoringStrategy';

export class MovieBarycenterStrategy implements ScoringStrategy<any> {
  score(movie: any, favorites: any[]) {
    const profile = {
      actionIntensity: this.normalize(this.avg(favorites, 'actionIntensity')),
      storyDepth: this.normalize(this.avg(favorites, 'storyDepth')),
      visualQuality: this.normalize(this.avg(favorites, 'visualQuality')),
      emotionLevel: this.normalize(this.avg(favorites, 'emotionLevel')),
      suspenseLevel: this.normalize(this.avg(favorites, 'suspenseLevel')),
    };

    const normalizedMovie = {
      actionIntensity: this.normalize(movie.actionIntensity),
      storyDepth: this.normalize(movie.storyDepth),
      visualQuality: this.normalize(movie.visualQuality),
      emotionLevel: this.normalize(movie.emotionLevel),
      suspenseLevel: this.normalize(movie.suspenseLevel),
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

  private avg(items: any[], key: string) {
    return items.reduce((sum, item) => sum + item[key], 0) / items.length;
  }

  private normalize(value: number): number {
    return value / 10;
  }
}
