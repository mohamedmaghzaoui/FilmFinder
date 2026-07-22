import { ScoringStrategy } from './ScoringStrategy';
import { Series } from '../../../types/Series';

// for now not used
export class SeriesWeightedStrategy implements ScoringStrategy<Series> {
  score(item: Series, _favorites?: Series[]): number {
    const characterDevelopment = this.normalize(
      item.characterDevelopment,
      0,
      10,
    );

    const storyComplexity = this.normalize(item.storyComplexity, 0, 5);

    const episodeAddiction = this.normalize(item.episodeAddiction, 0, 100);

    const dramaLevel = this.normalize(item.dramaLevel, 0, 10);

    const humorLevel = this.normalize(item.humorLevel, 0, 5);

    const score =
      characterDevelopment * 0.3 +
      storyComplexity * 0.3 +
      episodeAddiction * 0.2 +
      dramaLevel * 0.1 +
      humorLevel * 0.1;

    return score;
  }

  private normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min);
  }
}
