import { useParams, Link } from 'react-router-dom';
import { useMovie } from '../../hooks/movie/useMovie';

export default function MovieDetail() {
  const { id } = useParams();
  const { data, isLoading } = useMovie(Number(id));

  if (isLoading) return <p className="section">Loading...</p>;

  return (
    <section className="section">
      <div className="container">
        <Link to="/movies" className="button is-small mb-4">
          ← Back
        </Link>

        <h1 className="title">{data?.title}</h1>

        <div className="box">
          <p>
            <strong>Genre:</strong> {data?.genre}
          </p>
          <p>
            <strong>Year:</strong> {data?.releaseYear}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {data?.rating}
          </p>
          <p className="mt-3">{data?.description}</p>
        </div>
      </div>
    </section>
  );
}
