import { isMock } from '../../config/dataSource';

import { MovieRepository } from './repositories/MovieRepository';

import { MovieMockRepository } from './repositories/MovieMockRepository';
import { MovieService } from './services/MovieService';
import { MovieController } from './controllers/MovieController';

//2 options mock and real repository
const movieRepository = isMock()
  ? new MovieMockRepository()
  : new MovieRepository();

const movieService = new MovieService(movieRepository);

const movieController = new MovieController(movieService);

export default movieController;
