import { useNavigate, useParams } from 'react-router-dom';

import { useSeriesItem } from '../../hooks/series/useSeriesItem';

export default function SeriesDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: series, isLoading } = useSeriesItem(Number(id));

  if (isLoading) {
    return (
      <section className="section">
        <p>Loading series...</p>
      </section>
    );
  }

  if (!series) {
    return (
      <section className="section">
        <p>Series not found 😢</p>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <button
          className="button is-light mb-5"

          onClick={() => navigate(-1)}
        >
          ← Back to series
        </button>

        <div className="card">
          <header className="card-header has-background-dark">
            <div className="card-header-title">
              <div>
                <h1 className="title has-text-white">{series.title}</h1>

                <p className="has-text-white">
                  📺 {series.genre}
                  {' • '}
                  📅 {series.releaseYear}
                </p>
              </div>
            </div>
          </header>

          <div className="card-content">
            <h2 className="subtitle">About this series</h2>

            <p className="mb-5">{series.description}</p>

            <div className="columns">
              <div className="column">
                <div className="box has-text-centered">
                  <span className="is-size-3">🎬</span>

                  <p className="has-text-weight-bold">Seasons</p>

                  <p>{series.seasons}</p>
                </div>
              </div>

              <div className="column">
                <div className="box has-text-centered">
                  <span className="is-size-3">📺</span>

                  <p className="has-text-weight-bold">Episodes</p>

                  <p>{series.episodes}</p>
                </div>
              </div>

              <div className="column">
                <div className="box has-text-centered">
                  <span className="is-size-3">⭐</span>

                  <p className="has-text-weight-bold">Rating</p>

                  <p>{series.rating}/10</p>
                </div>
              </div>

              <div className="column">
                <div className="box has-text-centered">
                  <span className="is-size-3">📅</span>

                  <p className="has-text-weight-bold">Release</p>

                  <p>{series.releaseYear}</p>
                </div>
              </div>
            </div>
          </div>

          <footer className="card-footer">
            <button
              className="card-footer-item"

              onClick={() => navigate('/series')}
            >
              📺 Back to series
            </button>
          </footer>
        </div>
      </div>
    </section>
  );
}
