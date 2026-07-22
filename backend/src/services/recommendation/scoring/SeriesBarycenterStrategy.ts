import { ScoringStrategy } from './ScoringStrategy';
import { Series } from '../../../types/Series';

export class SeriesBarycenterStrategy implements ScoringStrategy<Series> {
  score(item: Series, favorites: Series[]) {
    const profile = {
      characterDevelopment: this.normalize(
        this.avg(favorites, 'characterDevelopment'),
        0,
        10,
      ),
      storyComplexity: this.normalize(
        this.avg(favorites, 'storyComplexity'),
        0,
        5,
      ),
      episodeAddiction: this.normalize(
        this.avg(favorites, 'episodeAddiction'),
        0,
        100,
      ),
      dramaLevel: this.normalize(this.avg(favorites, 'dramaLevel'), 0, 10),
      humorLevel: this.normalize(this.avg(favorites, 'humorLevel'), 0, 5),
    };

    const normalizedSeries = {
      characterDevelopment: this.normalize(
        Number(item.characterDevelopment),
        0,
        10,
      ),
      storyComplexity: this.normalize(Number(item.storyComplexity), 0, 5),
      episodeAddiction: this.normalize(Number(item.episodeAddiction), 0, 100),
      dramaLevel: this.normalize(Number(item.dramaLevel), 0, 10),
      humorLevel: this.normalize(Number(item.humorLevel), 0, 5),
    };

    const distance = Math.sqrt(
      (normalizedSeries.characterDevelopment - profile.characterDevelopment) **
        2 +
        (normalizedSeries.storyComplexity - profile.storyComplexity) ** 2 +
        (normalizedSeries.episodeAddiction - profile.episodeAddiction) ** 2 +
        (normalizedSeries.dramaLevel - profile.dramaLevel) ** 2 +
        (normalizedSeries.humorLevel - profile.humorLevel) ** 2,
    );

    return 1 / (1 + distance);
  }

  private avg(items: Series[], key: keyof Series) {
    return (
      items.reduce((sum, item) => sum + Number(item[key]), 0) / items.length
    );
  }

  private normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min);
  }
}
