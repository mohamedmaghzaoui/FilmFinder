import express from "express";
import cors from "cors";
import movieRoutes from "./modules/movie/movieRoutes";

const app = express();


app.use(cors());
app.use(express.json());
app.use("/movies", movieRoutes);

export default app;