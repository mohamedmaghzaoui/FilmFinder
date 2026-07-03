import { Router } from 'express';
import movieController from './MovieComposition';

const router = Router();

router.get('/', movieController.getAll);
router.get('/:id', movieController.getById);
router.post('/', movieController.create);
router.put('/:id', movieController.update);
router.delete('/:id', movieController.delete);

export default router;
