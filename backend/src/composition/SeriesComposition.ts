import { AppConfig } from '../config/AppConfig';
import { isMock } from '../config/dataSource';
import { SeriesController } from '../controllers/SeriesController';
import { SeriesMockRepository } from '../repositories/series/SeriesMockRepository';
import { SeriesRepository } from '../repositories/series/SeriesRepository';
import { SeriesService } from '../services/SeriesService';

const config = AppConfig.getInstance();
//2 options mock and real repository
const seriesRepository = config.isMock()
  ? new SeriesMockRepository()
  : new SeriesRepository();

const seriesService = new SeriesService(seriesRepository);

const seriesController = new SeriesController(seriesService);

export default seriesController;
