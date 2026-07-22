import { ScoringStrategy } from './ScoringStrategy';

export class AnimeBarycenterStrategy implements ScoringStrategy<any> {
  score(movie: any, favorites: any[]) {
    const profile = {
      fightIntensity: this.normalize(this.avg(favorites, 'fightIntensity')),
      worldBuilding: this.normalize(this.avg(favorites, 'worldBuilding')),
      animationQuality: this.normalize(this.avg(favorites, 'animationQuality')),
      emotionLevel: this.normalize(this.avg(favorites, 'emotionLevel')),
      fantasyLevel: this.normalize(this.avg(favorites, 'fantasyLevel')),
    };

    const normalizedMovie = {
      fightIntensity: this.normalize(movie.fightIntensity),
      worldBuilding: this.normalize(movie.worldBuilding),
      animationQuality: this.normalize(movie.animationQuality),
      emotionLevel: this.normalize(movie.emotionLevel),
      fantasyLevel: this.normalize(movie.fantasyLevel),
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

  private avg(items: any[], key: string) {
    return items.reduce((sum, item) => sum + item[key], 0) / items.length;
  }

  private normalize(value: number): number {
    return value / 10;
  }
}
