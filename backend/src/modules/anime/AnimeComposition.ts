import { isMock } from '../../config/dataSource';
import { AnimeController } from './controllers/AnimeController';
import { AnimeMockRepository } from './repositories/AnimeMockRepository';
import { AnimeRepository } from './repositories/AnimeRepository';
import { AnimeService } from './services/AnimeService';

const repository = isMock() ? new AnimeMockRepository() : new AnimeRepository();

const service = new AnimeService(repository);

const controller = new AnimeController(service);

export default controller;
