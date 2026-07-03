import express from 'express';
import cors from 'cors';
import movieRoutes from './modules/movie/MovieRoutes';
import animeRoutes from './modules/anime/AnimeRoutes';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/movies', movieRoutes);
app.use('/anime', animeRoutes);

export default app;
