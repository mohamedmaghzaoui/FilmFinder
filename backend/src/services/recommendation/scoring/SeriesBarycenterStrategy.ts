import { ScoringStrategy } from './ScoringStrategy';
import { Series } from '../../../types/Series';

export class SeriesBarycenterStrategy implements ScoringStrategy<Series> {
  score(item: Series, favorites: Series[]) {
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
      characterDevelopment: this.normalize(Number(item.characterDevelopment)),
      storyComplexity: this.normalize(Number(item.storyComplexity)),
      episodeAddiction: this.normalize(Number(item.episodeAddiction)),
      dramaLevel: this.normalize(Number(item.dramaLevel)),
      humorLevel: this.normalize(Number(item.humorLevel)),
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

  private avg(items: Series[], key: keyof Series) {
    return (
      items.reduce((sum, item) => sum + Number(item[key]), 0) / items.length
    );
  }

  private normalize(value: number): number {
    return value / 10;
  }
}
