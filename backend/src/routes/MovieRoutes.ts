import { Router } from 'express';
import movieController from '../composition/MovieComposition';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movies management
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of movies
 */
router.get('/', movieController.getAll);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie found
 *       404:
 *         description: Movie not found
 */
router.get('/:id', movieController.getById);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie created
 */
router.post('/', movieController.create);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
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
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Movie updated
 *       404:
 *         description: Movie not found
 */
router.put('/:id', movieController.update);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted
 *       404:
 *         description: Movie not found
 */
router.delete('/:id', movieController.delete);

export default router;
