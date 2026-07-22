import { useParams, useNavigate } from 'react-router-dom';

import { useAnimeItem } from '../../hooks/anime/useAnimeItem';

export default function AnimeDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: anime, isLoading } = useAnimeItem(Number(id));

  if (isLoading) {
    return (
      <section className="section">
        <p>Loading anime...</p>
      </section>
    );
  }

  if (!anime) {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Anime not found 😢</h1>

          <button className="button is-light" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <button className="button is-light mb-5" onClick={() => navigate(-1)}>
          ← Back to anime
        </button>

        <div className="card">
          <header className="card-header has-background-dark">
            <div className="card-header-title">
              <div>
                <h1 className="title has-text-white">{anime.title}</h1>

                <p className="has-text-white">
                  🍥 {anime.genre}
                  {' • '}
                  📅 {anime.releaseYear}
                </p>
              </div>
            </div>
          </header>

          <div className="card-content">
            <h2 className="subtitle">About this anime</h2>

            <p className="mb-5">{anime.description}</p>

            <div className="columns">
              <div className="column">
                <div className="box has-text-centered">
                  <span className="is-size-3">📺</span>

                  <p className="has-text-weight-bold">Episodes</p>

                  <p>{anime.episodes}</p>
                </div>
              </div>

              <div className="column">
                <div className="box has-text-centered">
                  <span className="is-size-3">⭐</span>

                  <p className="has-text-weight-bold">Rating</p>

                  <p>{anime.rating}/10</p>
                </div>
              </div>

              <div className="column">
                <div className="box has-text-centered">
                  <span className="is-size-3">🎬</span>

                  <p className="has-text-weight-bold">Status</p>

                  <p>{anime.status === 'finished' ? 'Completed' : 'Ongoing'}</p>
                </div>
              </div>

              <div className="column">
                <div className="box has-text-centered">
                  <span className="is-size-3">📅</span>

                  <p className="has-text-weight-bold">Release</p>

                  <p>{anime.releaseYear}</p>
                </div>
              </div>
            </div>
          </div>

          <footer className="card-footer">
            <button
              className="card-footer-item"

              onClick={() => navigate('/anime')}
            >
              🍥 Back to anime list
            </button>
          </footer>
        </div>
      </div>
    </section>
  );
}
