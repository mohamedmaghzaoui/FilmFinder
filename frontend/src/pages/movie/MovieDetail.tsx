import { useNavigate, useParams } from 'react-router-dom';
import { useMovies } from '../../hooks/movie/useMovies';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: movies = [] } = useMovies();

  const movie = movies.find((movie) => movie.id === Number(id));

  if (!movie) {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Movie not found 😢</h1>

          <button className="button is-light" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </section>
    );
  }

  function formatDuration(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours}h ${mins}min`;
  }

  return (
    <section className="section">
      <div className="container">
        <button className="button is-light mb-5" onClick={() => navigate(-1)}>
          ← Back to movies
        </button>

        <div className="card">
          <header className="card-header has-background-dark">
            <div className="card-header-title">
              <div>
                <h1 className="title has-text-white mb-2">{movie.title}</h1>

                <p className="has-text-white">
                  🎬 {movie.genre}
                  {' • '}
                  📅 {movie.releaseYear}
                </p>
              </div>
            </div>
          </header>

          <div className="card-content">
            <h2 className="subtitle">About this movie</h2>

            <p className="mb-5">{movie.description}</p>

            <div className="columns">
              <div className="column">
                <div className="box has-text-centered">
                  <span className="is-size-3">⏱️</span>

                  <p className="has-text-weight-bold">Duration</p>

                  <p>{formatDuration(movie.duration)}</p>
                </div>
              </div>

              <div className="column">
                <div className="box has-text-centered">
                  <span className="is-size-3">⭐</span>

                  <p className="has-text-weight-bold">Rating</p>

                  <p>{movie.rating}/10</p>
                </div>
              </div>

              <div className="column">
                <div className="box has-text-centered">
                  <span className="is-size-3">🎞️</span>

                  <p className="has-text-weight-bold">Release</p>

                  <p>{movie.releaseYear}</p>
                </div>
              </div>
            </div>
          </div>

          <footer className="card-footer">
            <button className="card-footer-item" onClick={() => navigate(-1)}>
              ← Back to list
            </button>
          </footer>
        </div>
      </div>
    </section>
  );
}
