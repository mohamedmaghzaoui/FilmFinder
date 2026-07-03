import { useAnime } from '../../hooks/anime/useAnime';
import { Link } from 'react-router-dom';

export default function AnimeList() {
  const { data, isLoading } = useAnime();

  if (isLoading) {
    return <p className="section">Loading anime...</p>;
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">🍥 Anime</h1>

        <div className="columns is-multiline">
          {data?.map((anime) => (
            <div key={anime.id} className="column is-one-quarter">
              <div className="card">
                <div className="card-content">
                  <p className="title is-5">{anime.title}</p>
                  <p className="subtitle is-6">{anime.genre}</p>

                  <p>⭐ {anime.rating}</p>
                  <p className="is-size-7">{anime.status}</p>
                </div>

                <footer className="card-footer">
                  <Link to={`/anime/${anime.id}`} className="card-footer-item">
                    View details
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
