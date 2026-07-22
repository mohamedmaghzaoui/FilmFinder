import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Welcome to FilmFinder 🎬</h1>
        <p className="subtitle">Browse movies, series and anime easily</p>

        <div className="columns mt-5">
          <div className="column">
            <div className="box has-background-light">
              <h2 className="title is-4">Movies</h2>
              <Link className="button is-dark is-fullwidth" to="/movies">
                Explore Movies
              </Link>
            </div>
          </div>

          <div className="column">
            <div className="box has-background-light">
              <h2 className="title is-4">Series</h2>
              <Link className="button is-link is-fullwidth" to="/series">
                Explore Series
              </Link>
            </div>
          </div>

          <div className="column">
            <div className="box has-background-light">
              <h2 className="title is-4">Anime</h2>
              <Link className="button is-primary is-fullwidth" to="/anime">
                Explore Anime
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
