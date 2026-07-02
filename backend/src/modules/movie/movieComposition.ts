import { isMock } from "../../config/dataSource";

import { MovieRepository } from "./repositories/MovieRepository";

import { MovieMockRepository } from "./repositories/MovieMockRepository";
import { MovieService } from "./services/MovieService";
import { MovieController } from "./controllers/MovieController";

//2 options mock and real repository
const repository = isMock() ? new MovieMockRepository() : new MovieRepository();

const service = new MovieService(repository);

const controller = new MovieController(service);

export default controller;
