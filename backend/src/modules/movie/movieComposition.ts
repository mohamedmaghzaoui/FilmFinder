import { MovieRepository } from "./movieRepository";

import { MovieController } from "./movieController";
import { MovieService } from "./MovieService";

const repo = new MovieRepository();
const service = new MovieService(repo);
const controller = new MovieController(service);

export default controller;