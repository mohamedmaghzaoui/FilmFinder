import { RecommendationService } from '../RecommendationService';

import { DefaultFilter } from '../filter/DefaultFilter';

import { MovieBarycenterStrategy } from '../scoring/MovieBarycenterStrategy';
import { AnimeBarycenterStrategy } from '../scoring/AnimeBarycenterStrategy';
import { SeriesBarycenterStrategy } from '../scoring/SeriesBarycenterStrategy';

import { RatingSort } from '../sorting/RatingSort';
import { ReleaseYearSort } from '../sorting/ReleaseYearSort';
import { ScoreSort } from '../sorting/ScoreSort';

import { LoggingScoringDecorator } from '../decorator/LoggingScoringDecorator';

export class RecommendationFactory {
  static create(type: string, repository: any) {
    const filterStrategy = new DefaultFilter();

    let scoringStrategy;

    switch (type) {
      case 'movie':
        scoringStrategy = new MovieBarycenterStrategy();
        break;

      case 'anime':
        scoringStrategy = new AnimeBarycenterStrategy();
        break;

      case 'series':
        scoringStrategy = new SeriesBarycenterStrategy();
        break;

      default:
        throw new Error('Invalid recommendation type');
    }

    const scoringStrategyWithLogging = new LoggingScoringDecorator(
      scoringStrategy,
    );

    const sortStrategies = {
      rating: new RatingSort(),
      releaseYear: new ReleaseYearSort(),
      score: new ScoreSort(),
    };

    return new RecommendationService(
      repository,
      filterStrategy,
      scoringStrategyWithLogging,
      sortStrategies,
    );
  }
}
