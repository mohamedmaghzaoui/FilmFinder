import { Routes, Route, Navigate } from 'react-router-dom';

import MoviesList from '../pages/movie/MoviesList';
import MovieDetail from '../pages/movie/MovieDetail';

import SeriesList from '../pages/series/SeriesList';
import SeriesDetail from '../pages/series/SeriesDetail';

import AnimeList from '../pages/anime/AnimeList';
import AnimeDetail from '../pages/anime/AnimeDetail';
import HomePage from '../pages/home/HomePage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/movies" element={<MoviesList />} />
      <Route path="/movies/:id" element={<MovieDetail />} />

      <Route path="/series" element={<SeriesList />} />
      <Route path="/series/:id" element={<SeriesDetail />} />

      <Route path="/anime" element={<AnimeList />} />
      <Route path="/anime/:id" element={<AnimeDetail />} />
    </Routes>
  );
}
