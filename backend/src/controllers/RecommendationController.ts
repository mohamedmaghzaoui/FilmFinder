import { Request, Response } from 'express';

export class RecommendationController {
  constructor(private services: any) {}

  // GET /recommendations/movie/search

  search = async (req: Request, res: Response) => {
    try {
      const type = req.params.type;

      const service = this.services[type as any];

      const result = await service.search(
        req.query,

        req.query.sort as string,
      );

      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  // POST /recommendations/movie/score

  recommend = async (req: Request, res: Response) => {
    try {
      const type = req.params.type;

      const service = this.services[type as any];

      const result = await service.recommend(
        req.body.favorites,

        req.body.filters,
      );

      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
}
