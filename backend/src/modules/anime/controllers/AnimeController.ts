import { Request, Response } from "express";
import { AnimeService } from "../services/AnimeService";
import { createAnimeSchema, updateAnimeSchema } from "../schema/animeSchema";

export class AnimeController {
  constructor(private service: AnimeService) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const anime = await this.service.getAllAnime();
      res.json(anime);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const anime = await this.service.getAnimeById(id);
      res.json(anime);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const result = createAnimeSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Invalid data",
          errors: result.error.flatten(),
        });
      }

      const anime = await this.service.createAnime(result.data);

      res.status(201).json(anime);
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const result = updateAnimeSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Invalid data",
          errors: result.error.flatten(),
        });
      }

      const anime = await this.service.updateAnime(id, result.data);

      res.json(anime);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      await this.service.deleteAnime(id);

      res.json({ message: "Deleted successfully" });
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };
}
