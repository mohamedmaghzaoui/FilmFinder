import { isMock } from "../config/dataSource";
import { AnimeController } from "./anime/controllers/AnimeController";
import { AnimeMockRepository } from "./anime/repositories/AnimeMockRepository";
import { AnimeRepository } from "./anime/repositories/AnimeRepository";
import { AnimeService } from "./anime/services/AnimeService";

const repository = isMock() ? new AnimeMockRepository() : new AnimeRepository();

const service = new AnimeService(repository);

const controller = new AnimeController(service);

export default controller;
