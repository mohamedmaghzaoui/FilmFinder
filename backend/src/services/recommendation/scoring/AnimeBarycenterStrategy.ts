import { ScoringStrategy } from './ScoringStrategy';
import { Anime } from '../../../types/Anime';

export class AnimeBarycenterStrategy implements ScoringStrategy<Anime> {
  score(item: Anime, favorites: Anime[]) {
    const profile = {
      fightIntensity: this.normalize(this.avg(favorites, 'fightIntensity')),
      worldBuilding: this.normalize(this.avg(favorites, 'worldBuilding')),
      animationQuality: this.normalize(this.avg(favorites, 'animationQuality')),
      emotionLevel: this.normalize(this.avg(favorites, 'emotionLevel')),
      fantasyLevel: this.normalize(this.avg(favorites, 'fantasyLevel')),
    };

    const normalizedMovie = {
      fightIntensity: this.normalize(Number(item.fightIntensity)),
      worldBuilding: this.normalize(Number(item.worldBuilding)),
      animationQuality: this.normalize(Number(item.animationQuality)),
      emotionLevel: this.normalize(Number(item.emotionLevel)),
      fantasyLevel: this.normalize(Number(item.fantasyLevel)),
    };

    const distance = Math.sqrt(
      (normalizedMovie.fightIntensity - profile.fightIntensity) ** 2 +
        (normalizedMovie.worldBuilding - profile.worldBuilding) ** 2 +
        (normalizedMovie.animationQuality - profile.animationQuality) ** 2 +
        (normalizedMovie.emotionLevel - profile.emotionLevel) ** 2 +
        (normalizedMovie.fantasyLevel - profile.fantasyLevel) ** 2,
    );

    return 1 / (1 + distance);
  }

  private avg(items: Anime[], key: keyof Anime) {
    return (
      items.reduce((sum, item) => sum + Number(item[key]), 0) / items.length
    );
  }

  private normalize(value: number): number {
    return value / 10;
  }
}
