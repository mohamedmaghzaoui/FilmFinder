import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSeries } from '../../hooks/series/useSeries';
import { useSeriesSearch } from '../../hooks/series/useSeriesSearch';
import { useSeriesRecommendation } from '../../hooks/series/useSeriesRecommendation';

import type { Series } from '../../types/Series';
import { seriesFavoriteStorage } from '../../utils/favorites.ts';

export default function SeriesList() {
  const navigate = useNavigate();

  const { data: allSeries = [], isLoading: seriesLoading } = useSeries();

  const searchMutation = useSeriesSearch();

  const recommendationMutation = useSeriesRecommendation();

  const [view, setView] = useState<'all' | 'search' | 'recommendation'>('all');

  const [filters, setFilters] = useState({
    genre: '',
    rating: '',
    releaseYear: '',
    sort: '',
  });

  const [favorites, setFavorites] = useState(seriesFavoriteStorage.getIds());

  if (seriesLoading) {
    return (
      <section className="section">
        <p>Loading series...</p>
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
    const favoriteSeries = allSeries.filter((series) =>
      favorites.includes(series.id),
    );

    recommendationMutation.mutate({
      favorites: favoriteSeries,

      filters: {
        genre: filters.genre,
        rating: filters.rating,
        releaseYear: filters.releaseYear,
      },
    });

    setView('recommendation');
  }

  function toggleFavorite(id: number) {
    if (seriesFavoriteStorage.isFavorite(id)) {
      seriesFavoriteStorage.remove(id);
    } else {
      seriesFavoriteStorage.add(id);
    }

    setFavorites(seriesFavoriteStorage.getIds());
  }

  let displayedSeries: Series[] = [];

  if (view === 'all') displayedSeries = allSeries;

  if (view === 'search') displayedSeries = searchMutation.data ?? [];

  if (view === 'recommendation')
    displayedSeries = recommendationMutation.data ?? [];

  const loading = searchMutation.isPending || recommendationMutation.isPending;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">📺 Series</h1>

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
              className="button is-info mx-6"

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

              onClick={() => setView('all')}
            >
              All series
            </button>
          )}
        </div>

        {loading && (
          <div className="has-text-centered">
            <button className="button is-loading">Loading</button>
          </div>
        )}

        <div className="columns is-multiline">
          {displayedSeries.map((series) => {
            const liked = favorites.includes(series.id);

            return (
              <div key={series.id} className="column is-one-quarter">
                <div
                  className={`card ${
                    liked ? 'has-background-success-light' : ''
                  }`}
                >
                  <div className="card-content">
                    <p className="title is-5">{series.title}</p>

                    <p>
                      Genre:
                      {series.genre}
                    </p>

                    <p>⭐ {series.rating}</p>

                    <p>📅 {series.releaseYear}</p>

                    <p>🎬 {series.seasons} seasons</p>

                    <p>📺 {series.episodes} episodes</p>
                  </div>

                  <footer className="card-footer">
                    <button
                      className="card-footer-item"

                      onClick={() => toggleFavorite(series.id)}
                    >
                      {liked ? '💔 Remove' : '❤️ Like'}
                    </button>

                    <button
                      className="card-footer-item"

                      onClick={() => navigate(`/series/${series.id}`)}
                    >
                      🔎 Details
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
