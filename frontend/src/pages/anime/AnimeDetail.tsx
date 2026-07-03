import { useParams, Link } from 'react-router-dom';
import { useAnimeItem } from '../../hooks/anime/useAnimeItem';

export default function AnimeDetail() {
  const { id } = useParams();
  const { data, isLoading } = useAnimeItem(Number(id));

  if (isLoading) {
    return <p className="section">Loading anime...</p>;
  }

  return (
    <section className="section">
      <div className="container">
        <Link to="/anime" className="button is-small mb-4">
          ← Back
        </Link>

        <h1 className="title">{data?.title}</h1>

        <div className="box">
          <p>
            <strong>Genre:</strong> {data?.genre}
          </p>
          <p>
            <strong>Status:</strong> {data?.status}
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
