import { Router } from 'express';
import animeController from './AnimeComposition';

const router = Router();

router.get('/', animeController.getAll);
router.get('/:id', animeController.getById);
router.post('/', animeController.create);
router.put('/:id', animeController.update);
router.delete('/:id', animeController.delete);

export default router;
