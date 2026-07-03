import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar is-dark" role="navigation">
      <div className="navbar-brand">
        <NavLink className="navbar-item has-text-weight-bold" to="/">
          🎬 FilmFinder
        </NavLink>
      </div>

      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <NavLink className="navbar-item" to="/movies">
            Movies
          </NavLink>

          <NavLink className="navbar-item" to="/series">
            Series
          </NavLink>

          <NavLink className="navbar-item" to="/anime">
            Anime
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
