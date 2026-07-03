import { createMovieSchema, updateMovieSchema } from '../schema/MovieSchema';
import { MovieService } from '../services/MovieService';
import { Request, Response } from 'express';
export class MovieController {
  constructor(private movieService: MovieService) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const movies = await this.movieService.getAllMovies();
      res.json(movies);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const movie = await this.movieService.getMovieById(id);
      res.json(movie);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const result = createMovieSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: 'Invalid data',
          errors: result.error.flatten(),
        });
      }

      const movie = await this.movieService.createMovie(result.data);

      res.status(201).json(movie);
    } catch (err: any) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const result = updateMovieSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: 'Invalid data',
          errors: result.error.flatten(),
        });
      }

      const movie = await this.movieService.updateMovie(id, result.data);

      res.json(movie);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.movieService.deleteMovie(id);
      res.json({ message: 'Deleted successfully' });
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };
}
