import { Request, Response } from 'express';
import { AnimeService } from '../services/AnimeService';
import { createAnimeSchema, updateAnimeSchema } from '../schema/AnimeSchema';

export class AnimeController {
  constructor(private animeService: AnimeService) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const anime = await this.animeService.getAllAnime();
      res.json(anime);
    } catch {
      res.status(500).json({ message: 'Server error' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const anime = await this.animeService.getAnimeById(id);
      res.json(anime);
    } catch {
      res.status(404).json({ message: 'Anime not found' });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const result = createAnimeSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: 'Invalid data',
          errors: result.error.flatten(),
        });
      }

      const anime = await this.animeService.createAnime(result.data);

      res.status(201).json(anime);
    } catch {
      res.status(500).json({ message: 'Server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const result = updateAnimeSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: 'Invalid data',
          errors: result.error.flatten(),
        });
      }

      const anime = await this.animeService.updateAnime(id, result.data);

      res.json(anime);
    } catch {
      res.status(404).json({ message: 'Anime not found' });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      await this.animeService.deleteAnime(id);

      res.json({ message: 'Deleted successfully' });
    } catch {
      res.status(404).json({ message: 'Anime not found' });
    }
  };
}
