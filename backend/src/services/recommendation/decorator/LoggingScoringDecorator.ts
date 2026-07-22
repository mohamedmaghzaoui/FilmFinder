export class LoggingScoringDecorator {
  constructor(private strategy: any) {}

  score(item: any, favorites: any[]) {
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
