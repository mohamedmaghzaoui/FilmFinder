import { AppConfig } from '../config/AppConfig';
import { AnimeController } from '../controllers/AnimeController';
import { AnimeMockRepository } from '../repositories/anime/AnimeMockRepository';
import { AnimeRepository } from '../repositories/anime/AnimeRepository';

import { AnimeService } from '../services/AnimeService';

const config = AppConfig.getInstance();

const animeRepository = config.isMock()
  ? new AnimeMockRepository()
  : new AnimeRepository();

const animeService = new AnimeService(animeRepository);

const animeController = new AnimeController(animeService);

export default animeController;
