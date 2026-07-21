import { Router } from 'express';
import seriesController from '../composition/SeriesComposition';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Series
 *   description: Series management
 */

/**
 * @swagger
 * /series:
 *   get:
 *     summary: Get all series
 *     tags: [Series]
 *     responses:
 *       200:
 *         description: List of series
 */
router.get('/', seriesController.getAll);

/**
 * @swagger
 * /series/{id}:
 *   get:
 *     summary: Get a series by id
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Series found
 *       404:
 *         description: Series not found
 */
router.get('/:id', seriesController.getById);

/**
 * @swagger
 * /series:
 *   post:
 *     summary: Create a series
 *     tags: [Series]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Series'
 *     responses:
 *       201:
 *         description: Series created
 */
router.post('/', seriesController.create);

/**
 * @swagger
 * /series/{id}:
 *   put:
 *     summary: Update a series
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Series'
 *     responses:
 *       200:
 *         description: Series updated
 *       404:
 *         description: Series not found
 */
router.put('/:id', seriesController.update);

/**
 * @swagger
 * /series/{id}:
 *   delete:
 *     summary: Delete a series
 *     tags: [Series]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Series deleted
 *       404:
 *         description: Series not found
 */
router.delete('/:id', seriesController.delete);

export default router;
