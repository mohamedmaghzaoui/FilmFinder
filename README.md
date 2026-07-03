# FilmFinder

This repository contains a simple media catalogue API and a React frontend. This README focuses on the backend: how to run it (mock or dev modes), the technologies used, the data model and a complete list of API endpoints. At the end there are quick notes to start the frontend.

## Project status

Development-ready example API for Movies, Series and Anime with two data sources: in-memory mock and SQLite via Drizzle ORM.

## Base backend entry

[backend/src/app.ts](backend/src/app.ts#L1)

## Server runner

[backend/src/server.ts](backend/src/server.ts#L1)

## Tech & Libraries

- Backend runtime: Node.js + TypeScript
- Web framework: Express
- ORM / DB: Drizzle ORM + better-sqlite3
- Validation: Zod
- Environment: cross-env for env scripts
- Dev: ts-node-dev

## Frontend

- Framework: React + Vite
- Language: TypeScript
- Run (from repository root):

```bash
cd frontend
npm install
npm run dev
```

The frontend is a simple Vite React app that expects the backend at `http://localhost:3000`.

## Prerequisites

- Node.js (recommended v18+)
- npm (or yarn)

**Repository layout (backend-focused)**

- `backend/src/app.ts`: Express app and route mounts
- `backend/src/server.ts`: app bootstrap
- `backend/src/modules/*`: domain modules (movie, series, anime)
- `backend/src/db/schema.ts`: Drizzle table definitions
- `backend/src/config/dataSource.ts`: toggles mock vs db using `DATA_SOURCE` env var

**Environment / Modes**

- The backend supports two run modes controlled by `DATA_SOURCE`:
  - `DATA_SOURCE=mock` — uses in-memory mock repositories (quick local development & tests)
  - `DATA_SOURCE=db` — uses the SQLite database via Drizzle

Run using the npm scripts in [backend/package.json](backend/package.json#L1):

```bash
# from the repository root
cd backend

# Run with the mock in-memory data source (hot-reloads)
npm run mock

# Run with the real DB data source (uses SQLite via Drizzle)
npm run dev
```

Both scripts run `ts-node-dev` and start the server on port 3000 by default.

**How the data source is selected**

- See [backend/src/config/dataSource.ts](backend/src/config/dataSource.ts#L1). The code checks `process.env.DATA_SOURCE` to decide which repository implementation the module compositions will instantiate.

## API reference (backend)

Base URL: `http://localhost:3000`

All endpoints follow a consistent REST shape. Each resource supports: `GET /` (list), `GET /:id` (detail), `POST /` (create), `PUT /:id` (update), `DELETE /:id` (delete).

- Movies: mounted at `/movies` — routes configured in [backend/src/modules/movie/MovieRoutes.ts](backend/src/modules/movie/MovieRoutes.ts#L1)
  - `GET /movies` — list all movies
  - `GET /movies/:id` — get movie by id
  - `POST /movies` — create movie (returns 201)
  - `PUT /movies/:id` — update movie
  - `DELETE /movies/:id` — delete movie

- Anime: mounted at `/anime` — routes configured in [backend/src/modules/anime/AnimeRoutes.ts](backend/src/modules/anime/AnimeRoutes.ts#L1)
  - `GET /anime` — list all anime
  - `GET /anime/:id` — get anime by id
  - `POST /anime` — create anime (returns 201)
  - `PUT /anime/:id` — update anime
  - `DELETE /anime/:id` — delete anime

- Series: mounted at `/series` — routes configured in [backend/src/modules/series/SeriesRoutes.ts](backend/src/modules/series/SeriesRoutes.ts#L1)
  - `GET /series` — list all series
  - `GET /series/:id` — get series by id
  - `POST /series` — create series (returns 201)
  - `PUT /series/:id` — update series
  - `DELETE /series/:id` — delete series

Request validation

- Requests to `POST` and `PUT` are validated with Zod. Validation schemas are in each module under `schema/`.
  - Movie schemas: [backend/src/modules/movie/schema/movieSchema.ts](backend/src/modules/movie/schema/movieSchema.ts#L1)
  - Anime schemas: [backend/src/modules/anime/schema/animeSchema.ts](backend/src/modules/anime/schema/animeSchema.ts#L1)
  - Series schemas: [backend/src/modules/series/schema/SeriesSchema.ts](backend/src/modules/series/schema/SeriesSchema.ts#L1)

Example request bodies

- Create Movie (POST /movies)

```json
{
  "title": "Inception",
  "genre": "Sci-Fi",
  "duration": 148,
  "rating": 8.8,
  "releaseYear": 2010,
  "description": "A thief who steals secrets through dreams."
}
```

- Create Anime (POST /anime)

```json
{
  "title": "Naruto",
  "genre": "Action",
  "episodes": 220,
  "rating": 4.7,
  "releaseYear": 2002,
  "status": "finished",
  "description": "A young ninja seeks recognition."
}
```

- Create Series (POST /series)

```json
{
  "title": "Breaking Bad",
  "genre": "Crime",
  "seasons": 5,
  "episodes": 62,
  "rating": 4.9,
  "releaseYear": 2008,
  "description": "A chemistry teacher turned meth producer."
}
```

Data model / Entities

- The table definitions are in [backend/src/db/schema.ts](backend/src/db/schema.ts#L1). Important fields per entity:

- Movie
  - `id` (integer, PK)
  - `title` (text)
  - `genre` (text)
  - `duration` (integer)
  - `rating` (real)
  - `releaseYear` (integer)
  - `description` (text)

- Series
  - `id`, `title`, `genre`
  - `seasons` (integer)
  - `episodes` (integer)
  - `rating`, `releaseYear`, `description`

- Anime
  - `id`, `title`, `genre`
  - `episodes` (integer)
  - `rating`, `releaseYear`
  - `status` (text) — expected values: `ongoing` | `finished`
  - `description`

Mock data

- Example mock data is available in each module under `mocks/`. The compositions choose the mock or real repository based on `DATA_SOURCE`.
  - [backend/src/modules/movie/mocks/Movies.ts](backend/src/modules/movie/mocks/Movies.ts#L1)
  - [backend/src/modules/series/mocks/Series.ts](backend/src/modules/series/mocks/Series.ts#L1)
  - [backend/src/modules/anime/mocks/Anime.ts](backend/src/modules/anime/mocks/Anime.ts#L1)

Notes on repositories and switching data source

- Each module has two repository implementations (mock + real). The composition files decide which to instantiate by calling `isMock()` from [backend/src/config/dataSource.ts](backend/src/config/dataSource.ts#L1).

Running the frontend

- The frontend is a Vite React app. To run it:

```bash
cd frontend
npm install
npm run dev
```

This will start the Vite dev server (default `http://localhost:5173`). The frontend expects the backend API at `http://localhost:3000` by default.

Testing, formatting & linting

- Backend format script: `cd backend && npm run format` (uses Prettier)
- Frontend format script: `cd frontend && npm run format`

Further improvements and notes

- Add a `.env.example` with `DATA_SOURCE` and any DB path configuration.
- Provide a small migration / seed step (drizzle-kit) for the SQLite database, if you want persistent seeded data in `db/`.

If you want, I can:

- add a `.env.example` and a simple migration/seed script
- add OpenAPI / Swagger docs for the endpoints

---

Generated by your development assistant — let me know if you want this README expanded (examples, curl snippets, or OpenAPI export).
