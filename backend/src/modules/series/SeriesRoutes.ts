import { Router } from 'express';
import seriesController from './SeriesComposition';

const router = Router();

router.get('/', seriesController.getAll);
router.get('/:id', seriesController.getById);
router.post('/', seriesController.create);
router.put('/:id', seriesController.update);
router.delete('/:id', seriesController.delete);

export default router;
