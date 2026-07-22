import { ScoringStrategy } from './ScoringStrategy';
import { Movie } from '../../../types/Movie';

export class MovieWeightedStrategy implements ScoringStrategy<Movie> {
  score(item: Movie): number {
    const action = this.normalize(item.actionIntensity, 0, 100);
    const story = this.normalize(item.storyDepth, 0, 10);
    const visual = this.normalize(item.visualQuality, 0, 5);
    const emotion = this.normalize(item.emotionLevel, 0, 100);
    const suspense = this.normalize(item.suspenseLevel, 0, 10);

    const score =
      action * 0.3 +
      story * 0.3 +
      visual * 0.2 +
      emotion * 0.1 +
      suspense * 0.1;

    return score;
  }

  private normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min);
  }
}
