import { Router } from 'express';

import recommendationController from '../composition/RecommendationComposition';

const router = Router();

// filtre + tri classique

router.get(
  '/:type/search',

  recommendationController.search,
);

// recommandation barycentre

router.post(
  '/:type/score',

  recommendationController.recommend,
);

export default router;
