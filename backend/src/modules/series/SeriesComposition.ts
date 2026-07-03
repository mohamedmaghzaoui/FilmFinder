import { isMock } from '../../config/dataSource';
import { SeriesController } from './controllers/SeriesController';
import { SeriesMockRepository } from './repositories/SeriesMockRepository';
import { SeriesRepository } from './repositories/SeriesRepository';
import { SeriesService } from './services/SeriesService';

//2 options mock and real repository
const repository = isMock()
  ? new SeriesMockRepository()
  : new SeriesRepository();

const service = new SeriesService(repository);

const controller = new SeriesController(service);

export default controller;
