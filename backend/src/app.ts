import express from 'express';
import cors from 'cors';
import movieRoutes from './modules/movie/MovieRoutes';
import animeRoutes from './modules/anime/AnimeRoutes';
import seriesRoutes from './modules/series/SeriesRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/movies', movieRoutes);
app.use('/anime', animeRoutes);
app.use('/series', seriesRoutes);

export default app;
