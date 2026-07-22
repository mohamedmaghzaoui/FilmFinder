import { Request, Response } from 'express';
import { RecommendationType } from '../types/Recommendation';

export class RecommendationController {
  constructor(private services: any) {}

  // GET /recommendations/movie/search

  search = async (req: Request, res: Response) => {
    try {
      const type = req.params.type as RecommendationType;

      const service = this.services[type];

      const result = await service.search(
        req.query,

        req.query.sort as string,
      );

      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  // POST /recommendations/movie/score

  recommend = async (req: Request, res: Response) => {
    try {
      const type = req.params.type as RecommendationType;

      const service = this.services[type];

      const result = await service.recommend(
        req.body.favorites,

        req.body.filters,
      );

      res.json(result);
    } catch {
      res.status(500).json({ message: 'Server error' });
    }
  };
}
