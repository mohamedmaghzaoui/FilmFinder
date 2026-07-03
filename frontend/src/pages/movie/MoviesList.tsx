import { Link } from 'react-router-dom';
import { useMovies } from '../../hooks/movie/useMovies';

export default function MoviesList() {
  const { data, isLoading } = useMovies();

  if (isLoading) {
    return <p className="section">Loading movies...</p>;
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Movies 🎬</h1>

        <div className="columns is-multiline">
          {data?.map((movie) => (
            <div key={movie.id} className="column is-one-quarter">
              <div className="card">
                <div className="card-content">
                  <p className="title is-5">{movie.title}</p>
                  <p className="subtitle is-6">{movie.genre}</p>
                  <p>⭐ {movie.rating}</p>
                </div>

                <footer className="card-footer">
                  <Link to={`/movies/${movie.id}`} className="card-footer-item">
                    View
                  </Link>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
