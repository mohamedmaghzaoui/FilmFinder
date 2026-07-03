import { Request, Response } from 'express';
import { SeriesService } from '../services/SeriesService';
import { createSeriesSchema, updateSeriesSchema } from '../schema/SeriesSchema';

export class SeriesController {
  constructor(private service: SeriesService) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const data = await this.service.getAllSeries();
      res.json(data);
    } catch {
      res.status(500).json({ message: 'Server error' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data = await this.service.getSeriesById(id);
      res.json(data);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const result = createSeriesSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: 'Invalid data',
          errors: result.error.flatten(),
        });
      }

      const data = await this.service.createSeries(result.data);

      res.status(201).json(data);
    } catch {
      res.status(500).json({ message: 'Server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const result = updateSeriesSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: 'Invalid data',
          errors: result.error.flatten(),
        });
      }

      const data = await this.service.updateSeries(id, result.data);

      res.json(data);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      await this.service.deleteSeries(id);

      res.json({ message: 'Deleted successfully' });
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  };
}
