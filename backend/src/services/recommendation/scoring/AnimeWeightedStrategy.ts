import { ScoringStrategy } from './ScoringStrategy';
import { Anime } from '../../../types/Anime';

//not used for now
export class AnimeWeightedStrategy implements ScoringStrategy<Anime> {
  score(item: Anime, _favorites?: Anime[]): number {
    const fightIntensity = this.normalize(item.fightIntensity, 0, 100);

    const worldBuilding = this.normalize(item.worldBuilding, 0, 10);

    const animationQuality = this.normalize(item.animationQuality, 0, 5);

    const emotionLevel = this.normalize(item.emotionLevel, 0, 10);

    const fantasyLevel = this.normalize(item.fantasyLevel, 0, 100);

    const score =
      fightIntensity * 0.3 +
      worldBuilding * 0.25 +
      animationQuality * 0.2 +
      emotionLevel * 0.15 +
      fantasyLevel * 0.1;

    return score;
  }

  private normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min);
  }
}
