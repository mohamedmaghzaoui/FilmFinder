import { useParams, Link } from 'react-router-dom';

import { useSeriesItem } from '../../hooks/series/useSeriesItem';

export default function SeriesDetail() {
  const { id } = useParams();
  const { data, isLoading } = useSeriesItem(Number(id));

  if (isLoading) {
    return <p className="section">Loading series...</p>;
  }

  return (
    <section className="section">
      <div className="container">
        <Link to="/series" className="button is-small mb-4">
          ← Back
        </Link>

        <h1 className="title">{data?.title}</h1>

        <div className="box">
          <p>
            <strong>Genre:</strong> {data?.genre}
          </p>
          <p>
            <strong>Seasons:</strong> {data?.seasons}
          </p>
          <p>
            <strong>Episodes:</strong> {data?.episodes}
          </p>
          <p>
            <strong>Year:</strong> {data?.releaseYear}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {data?.rating}
          </p>

          <hr />

          <p>{data?.description}</p>
        </div>
      </div>
    </section>
  );
}
