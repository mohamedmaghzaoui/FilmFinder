import { useSeries } from '../../hooks/series/useSeries';
import { Link } from 'react-router-dom';

export default function SeriesList() {
  const { data, isLoading } = useSeries();

  if (isLoading) {
    return <p className="section">Loading series...</p>;
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">📺 Series</h1>

        <div className="columns is-multiline">
          {data?.map((serie) => (
            <div key={serie.id} className="column is-one-quarter">
              <div className="card">
                <div className="card-content">
                  <p className="title is-5">{serie.title}</p>
                  <p className="subtitle is-6">{serie.genre}</p>

                  <p>⭐ {serie.rating}</p>
                  <p className="is-size-7">Seasons: {serie.seasons}</p>
                </div>

                <footer className="card-footer">
                  <Link to={`/series/${serie.id}`} className="card-footer-item">
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
