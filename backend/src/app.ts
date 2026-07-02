import express from 'express';
import cors from 'cors';
import movieRoutes from './modules/movie/movieRoutes';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/movies', movieRoutes);

export default app;
