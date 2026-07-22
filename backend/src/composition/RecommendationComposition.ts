import { AppConfig } from '../config/AppConfig';

// repositories

import { MovieRepository } from '../repositories/movie/MovieRepository';

import { MovieMockRepository } from '../repositories/movie/MovieMockRepository';

import { AnimeRepository } from '../repositories/anime/AnimeRepository';

import { AnimeMockRepository } from '../repositories/anime/AnimeMockRepository';

import { SeriesRepository } from '../repositories/series/SeriesRepository';

import { SeriesMockRepository } from '../repositories/series/SeriesMockRepository';

// factory

import { RecommendationFactory } from '../services/recommendation/factory/RecommendationFactory';

// controller

import { RecommendationController } from '../controllers/RecommendationController';

const config = AppConfig.getInstance();

// repositories

const movieRepository = config.isMock()
  ? new MovieMockRepository()
  : new MovieRepository();

const animeRepository = config.isMock()
  ? new AnimeMockRepository()
  : new AnimeRepository();

const seriesRepository = config.isMock()
  ? new SeriesMockRepository()
  : new SeriesRepository();

// services

const movieRecommendationService = RecommendationFactory.create(
  'movie',

  movieRepository,
);

const animeRecommendationService = RecommendationFactory.create(
  'anime',

  animeRepository,
);

const seriesRecommendationService = RecommendationFactory.create(
  'series',

  seriesRepository,
);

// controller

const recommendationController = new RecommendationController({
  movie: movieRecommendationService,

  anime: animeRecommendationService,

  series: seriesRecommendationService,
});

export default recommendationController;
