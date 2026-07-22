import { ScoringStrategy } from '../scoring/ScoringStrategy';

export class LoggingScoringDecorator implements ScoringStrategy<any> {
  constructor(private strategy: ScoringStrategy<any>) {}

  score(item: any, favorites: any[]): number {
    console.log(`🎯 Calcul du score pour : ${item.title}`);

    const start = performance.now();

    const result = this.strategy.score(item, favorites);

    const duration = performance.now() - start;

    console.log(
      `✅ Score ${result.toFixed(4)} calculé en ${duration.toFixed(3)} ms`,
    );

    return result;
  }
}
