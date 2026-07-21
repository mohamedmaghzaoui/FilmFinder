import { isMock } from '../config/dataSource';
import { MovieController } from '../controllers/MovieController';
import { MovieMockRepository } from '../repositories/movie/MovieMockRepository';
import { MovieRepository } from '../repositories/movie/MovieRepository';
import { MovieService } from '../services/MovieService';

//2 options mock and real repository
const movieRepository = isMock()
  ? new MovieMockRepository()
  : new MovieRepository();

const movieService = new MovieService(movieRepository);

const movieController = new MovieController(movieService);

export default movieController;
