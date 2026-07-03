import { isMock } from '../../config/dataSource';
import { AnimeController } from './controllers/AnimeController';
import { AnimeMockRepository } from './repositories/AnimeMockRepository';
import { AnimeRepository } from './repositories/AnimeRepository';
import { AnimeService } from './services/AnimeService';

const animeRepository = isMock()
  ? new AnimeMockRepository()
  : new AnimeRepository();

const animeService = new AnimeService(animeRepository);

const animeController = new AnimeController(animeService);

export default animeController;
