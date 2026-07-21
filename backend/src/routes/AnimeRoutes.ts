import { Router } from 'express';
import animeController from '../composition/AnimeComposition';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Anime
 *   description: Anime management
 */

/**
 * @swagger
 * /anime:
 *   get:
 *     summary: Get all anime
 *     tags: [Anime]
 *     responses:
 *       200:
 *         description: List of anime
 */
router.get('/', animeController.getAll);

/**
 * @swagger
 * /anime/{id}:
 *   get:
 *     summary: Get an anime by id
 *     tags: [Anime]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Anime found
 *       404:
 *         description: Anime not found
 */
router.get('/:id', animeController.getById);

/**
 * @swagger
 * /anime:
 *   post:
 *     summary: Create an anime
 *     tags: [Anime]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Anime'
 *     responses:
 *       201:
 *         description: Anime created
 */
router.post('/', animeController.create);

/**
 * @swagger
 * /anime/{id}:
 *   put:
 *     summary: Update an anime
 *     tags: [Anime]
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
 *             $ref: '#/components/schemas/Anime'
 *     responses:
 *       200:
 *         description: Anime updated
 *       404:
 *         description: Anime not found
 */
router.put('/:id', animeController.update);

/**
 * @swagger
 * /anime/{id}:
 *   delete:
 *     summary: Delete an anime
 *     tags: [Anime]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Anime deleted
 *       404:
 *         description: Anime not found
 */
router.delete('/:id', animeController.delete);

export default router;
