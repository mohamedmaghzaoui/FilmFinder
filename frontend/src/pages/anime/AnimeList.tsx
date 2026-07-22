import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAnime } from '../../hooks/anime/useAnime';

import type { Anime } from '../../types/Anime';
import { useAnimeSearch } from '../../hooks/anime/useAnimeSearch';
import { useAnimeRecommendation } from '../../hooks/anime/useAnimeRecommendation';
import { animeFavoriteStorage } from '../../utils/favorites.ts';

export default function AnimeList() {
  const navigate = useNavigate();

  const { data: allAnime = [], isLoading: animeLoading } = useAnime();

  const searchMutation = useAnimeSearch();

  const recommendationMutation = useAnimeRecommendation();

  const [view, setView] = useState<'all' | 'search' | 'recommendation'>('all');

  const [filters, setFilters] = useState({
    genre: '',
    rating: '',
    releaseYear: '',
    sort: '',
  });

  const [favorites, setFavorites] = useState(animeFavoriteStorage.getIds());

  if (animeLoading) {
    return (
      <section className="section">
        <p>Loading anime...</p>
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
    const favoriteAnime = allAnime.filter((anime) =>
      favorites.includes(anime.id),
    );

    recommendationMutation.mutate({
      favorites: favoriteAnime,

      filters: {
        genre: filters.genre,
        rating: filters.rating,
        releaseYear: filters.releaseYear,
      },
    });

    setView('recommendation');
  }

  function toggleFavorite(id: number) {
    if (animeFavoriteStorage.isFavorite(id)) {
      animeFavoriteStorage.remove(id);
    } else {
      animeFavoriteStorage.add(id);
    }

    setFavorites(animeFavoriteStorage.getIds());
  }

  let displayedAnime: Anime[] = [];

  if (view === 'all') displayedAnime = allAnime;

  if (view === 'search') displayedAnime = searchMutation.data ?? [];

  if (view === 'recommendation')
    displayedAnime = recommendationMutation.data ?? [];

  const loading = searchMutation.isPending || recommendationMutation.isPending;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">🍥 Anime</h1>

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
              className="button is-info  mx-6"

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
              All anime
            </button>
          )}
        </div>

        {loading && (
          <div className="has-text-centered">
            <button className="button is-loading">Loading</button>
          </div>
        )}

        <div className="columns is-multiline">
          {displayedAnime.map((anime) => {
            const liked = favorites.includes(anime.id);

            return (
              <div key={anime.id} className="column is-one-quarter">
                <div
                  className={`card ${
                    liked ? 'has-background-success-light' : ''
                  }`}
                >
                  <div className="card-content">
                    <p className="title is-5">{anime.title}</p>

                    <p>
                      Genre:
                      {anime.genre}
                    </p>

                    <p>⭐ {anime.rating}</p>

                    <p>📅 {anime.releaseYear}</p>

                    <p>📺 {anime.episodes} episodes</p>

                    <p>
                      {anime.status === 'finished'
                        ? '✅ Finished'
                        : '🟡 Ongoing'}
                    </p>
                  </div>

                  <footer className="card-footer">
                    <button
                      className="card-footer-item"

                      onClick={() => toggleFavorite(anime.id)}
                    >
                      {liked ? '💔 Remove' : '❤️ Like'}
                    </button>

                    <button
                      className="card-footer-item"

                      onClick={() => navigate(`/anime/${anime.id}`)}
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
