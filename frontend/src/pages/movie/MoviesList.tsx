import { useState } from 'react';

import { useMovies } from '../../hooks/movie/useMovies';

import { favoriteStorage } from '../../utils/favorites';
import { useMovieSearch } from '../../hooks/movie/useMovieSearch';
import { useMovieRecommendation } from '../../hooks/movie/useMovieRecommendation';

export default function MoviesList() {
  const { data: allMovies = [], isLoading: moviesLoading } = useMovies();

  const searchMutation = useMovieSearch();

  const recommendationMutation = useMovieRecommendation();

  const [view, setView] = useState<'all' | 'search' | 'recommendation'>('all');

  const [filters, setFilters] = useState({
    genre: '',
    rating: '',
    releaseYear: '',
    sort: '',
  });

  const [favorites, setFavorites] = useState(favoriteStorage.getIds());

  if (moviesLoading) {
    return (
      <section className="section">
        <p>Loading movies...</p>
      </section>
    );
  }

  function updateFilter(key: string, value: string) {
    setFilters((prev) => ({
      ...prev,

      [key]: value,
    }));
  }

  function applyFilters() {
    searchMutation.mutate(filters);

    setView('search');
  }

  function showRecommendations() {
    const favoriteMovies = allMovies.filter((movie) =>
      favorites.includes(movie.id),
    );

    recommendationMutation.mutate({
      favorites: favoriteMovies,

      filters: {
        genre: filters.genre,
        rating: filters.rating,
        releaseYear: filters.releaseYear,
      },
    });

    setView('recommendation');
  }

  function toggleFavorite(id: number) {
    if (favoriteStorage.isFavorite(id)) {
      favoriteStorage.remove(id);
    } else {
      favoriteStorage.add(id);
    }

    setFavorites(favoriteStorage.getIds());
  }

  let displayedMovies = [];

  if (view === 'all') displayedMovies = allMovies;

  if (view === 'search') displayedMovies = searchMutation.data ?? [];

  if (view === 'recommendation')
    displayedMovies = recommendationMutation.data ?? [];

  const loading = searchMutation.isPending || recommendationMutation.isPending;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Movies 🎬</h1>

        {/* FILTER BAR seulement en mode normal/recherche */}

        {view !== 'recommendation' && (
          <div className="box">
            <h3 className="subtitle">Filters</h3>

            <input
              className="input mb-2"

              placeholder="Genre"

              value={filters.genre}

              onChange={(e) => updateFilter('genre', e.target.value)}
            />

            <input
              className="input mb-2"

              type="number"

              placeholder="Minimum rating"

              value={filters.rating}

              onChange={(e) => updateFilter('rating', e.target.value)}
            />

            <input
              className="input mb-2"

              type="number"

              placeholder="Release year from"

              value={filters.releaseYear}

              onChange={(e) => updateFilter('releaseYear', e.target.value)}
            />

            <select
              className="select"

              value={filters.sort}

              onChange={(e) => updateFilter('sort', e.target.value)}
            >
              <option value="">No sort</option>

              <option value="rating">Rating ⭐</option>

              <option value="releaseYear">Newest 📅</option>
            </select>

            <button
              className="button is-info mt-3"

              onClick={applyFilters}
            >
              Apply filters
            </button>
          </div>
        )}

        <div className="buttons">
          <button
            className="button is-primary"

            onClick={showRecommendations}
          >
            ❤️ My recommendations
          </button>

          {view !== 'all' && (
            <button
              className="button is-light"

              onClick={() => {
                setView('all');
              }}
            >
              All movies
            </button>
          )}
        </div>

        {loading && (
          <div className="has-text-centered">
            <button className="button is-loading">Loading</button>
          </div>
        )}

        <div className="columns is-multiline">
          {displayedMovies.map((movie) => {
            const liked = favorites.includes(movie.id);

            return (
              <div
                key={movie.id}

                className="column is-one-quarter"
              >
                <div
                  className={`card 
${liked ? 'has-background-success-light' : ''}`}
                >
                  <div className="card-content">
                    <p className="title is-5">{movie.title}</p>

                    <p>
                      Genre:
                      {movie.genre}
                    </p>

                    <p>⭐ {movie.rating}</p>

                    <p>📅 {movie.releaseYear}</p>
                  </div>

                  <footer className="card-footer">
                    <button
                      className="card-footer-item"

                      onClick={() => toggleFavorite(movie.id)}
                    >
                      {liked ? '💔 Remove' : '❤️ Like'}
                    </button>
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
