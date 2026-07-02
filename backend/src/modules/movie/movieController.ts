
import { MovieService } from "./MovieService";
import { MovieRequest, MovieUpdateRequest } from "./types/movies";
import { Request, Response } from "express";
export class MovieController {
  constructor(private service: MovieService) {}

  getAll = async (req:Request, res:Response) => {
    try {
      
      const movies = await this.service.getAllMovies();
      res.json(movies);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };

  getById = async (req:Request, res:Response) => {
    try {
      const id = Number(req.params.id);
      const movie = await this.service.getMovieById(id);
      res.json(movie);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  create = async (req:Request, res:Response) => {
    try {
      const data: MovieRequest = req.body;
      const movie = await this.service.createMovie(data);
      res.status(201).json(movie);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  };

  update = async (req:Request, res:Response) => {
    try {
      const data: MovieUpdateRequest = req.body;
      const id = Number(req.params.id);
      const movie = await this.service.updateMovie(id, data);
      res.json(movie);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  delete = async (req:Request, res:Response) => {
    try {
      const id = Number(req.params.id);
      await this.service.deleteMovie(id);
      res.json({ message: "Deleted successfully" });
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };
}