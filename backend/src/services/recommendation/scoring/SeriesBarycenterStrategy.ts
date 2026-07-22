import { ScoringStrategy } from './ScoringStrategy';

export class SeriesBarycenterStrategy implements ScoringStrategy<any> {
  score(movie: any, favorites: any[]) {
    const profile = {
      characterDevelopment: this.normalize(
        this.avg(favorites, 'characterDevelopment'),
      ),
      storyComplexity: this.normalize(this.avg(favorites, 'storyComplexity')),
      episodeAddiction: this.normalize(this.avg(favorites, 'episodeAddiction')),
      dramaLevel: this.normalize(this.avg(favorites, 'dramaLevel')),
      humorLevel: this.normalize(this.avg(favorites, 'humorLevel')),
    };

    const normalizedMovie = {
      characterDevelopment: this.normalize(movie.characterDevelopment),
      storyComplexity: this.normalize(movie.storyComplexity),
      episodeAddiction: this.normalize(movie.episodeAddiction),
      dramaLevel: this.normalize(movie.dramaLevel),
      humorLevel: this.normalize(movie.humorLevel),
    };

    const distance = Math.sqrt(
      (normalizedMovie.characterDevelopment - profile.characterDevelopment) **
        2 +
        (normalizedMovie.storyComplexity - profile.storyComplexity) ** 2 +
        (normalizedMovie.episodeAddiction - profile.episodeAddiction) ** 2 +
        (normalizedMovie.dramaLevel - profile.dramaLevel) ** 2 +
        (normalizedMovie.humorLevel - profile.humorLevel) ** 2,
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
