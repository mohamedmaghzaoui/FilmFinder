import { isMock } from '../../config/dataSource';
import { SeriesController } from './controllers/SeriesController';
import { SeriesMockRepository } from './repositories/SeriesMockRepository';
import { SeriesRepository } from './repositories/SeriesRepository';
import { SeriesService } from './services/SeriesService';

//2 options mock and real repository
const seriesRepository = isMock()
  ? new SeriesMockRepository()
  : new SeriesRepository();

const seriesService = new SeriesService(seriesRepository);

const seriesController = new SeriesController(seriesService);

export default seriesController;
