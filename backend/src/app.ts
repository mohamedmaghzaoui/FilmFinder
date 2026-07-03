import express from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger';

import movieRoutes from './modules/movie/MovieRoutes';
import animeRoutes from './modules/anime/AnimeRoutes';
import seriesRoutes from './modules/series/SeriesRoutes';

const app = express();

app.use(cors());
app.use(express.json());

//swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/movies', movieRoutes);
app.use('/anime', animeRoutes);
app.use('/series', seriesRoutes);

export default app;
