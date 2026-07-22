import { ScoringStrategy } from './ScoringStrategy';
import { Anime } from '../../../types/Anime';

export class AnimeBarycenterStrategy implements ScoringStrategy<Anime> {
  score(item: Anime, favorites: Anime[]) {
    const profile = {
      fightIntensity: this.normalize(
        this.avg(favorites, 'fightIntensity'),
        0,
        100,
      ),
      worldBuilding: this.normalize(
        this.avg(favorites, 'worldBuilding'),
        0,
        10,
      ),
      animationQuality: this.normalize(
        this.avg(favorites, 'animationQuality'),
        0,
        5,
      ),
      emotionLevel: this.normalize(this.avg(favorites, 'emotionLevel'), 0, 10),
      fantasyLevel: this.normalize(this.avg(favorites, 'fantasyLevel'), 0, 100),
    };

    const normalizedAnime = {
      fightIntensity: this.normalize(Number(item.fightIntensity), 0, 100),
      worldBuilding: this.normalize(Number(item.worldBuilding), 0, 10),
      animationQuality: this.normalize(Number(item.animationQuality), 0, 5),
      emotionLevel: this.normalize(Number(item.emotionLevel), 0, 10),
      fantasyLevel: this.normalize(Number(item.fantasyLevel), 0, 100),
    };

    const distance = Math.sqrt(
      (normalizedAnime.fightIntensity - profile.fightIntensity) ** 2 +
        (normalizedAnime.worldBuilding - profile.worldBuilding) ** 2 +
        (normalizedAnime.animationQuality - profile.animationQuality) ** 2 +
        (normalizedAnime.emotionLevel - profile.emotionLevel) ** 2 +
        (normalizedAnime.fantasyLevel - profile.fantasyLevel) ** 2,
    );

    return 1 / (1 + distance);
  }

  private avg(items: Anime[], key: keyof Anime) {
    return (
      items.reduce((sum, item) => sum + Number(item[key]), 0) / items.length
    );
  }

  private normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min);
  }
}
