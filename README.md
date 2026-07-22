# FilmFinder

FilmFinder is a media catalog project built with a Node.js/TypeScript backend and a React/Vite frontend. The current version focuses on movies, anime, and series, with a recommendation system and search endpoints.

## État du projet

Le backend expose maintenant :

- des endpoints CRUD classiques pour les films, séries et anime
- des endpoints de recherche avancée
- des endpoints de recommandation basés sur un score barycentrique
- une architecture orientée patterns de conception

## Architecture du projet

### Backend

- Runtime : Node.js + TypeScript
- Framework web : Express
- Validation : Zod
- Documentation API : Swagger
- Tests : Jest

### Frontend

- Framework : React + Vite
- Langage : TypeScript

## Structure importante

- [backend/src/app.ts](backend/src/app.ts) : point d’entrée Express et montage des routes
- [backend/src/server.ts](backend/src/server.ts) : démarrage du serveur
- [backend/src/routes](backend/src/routes) : définition des routes API
- [backend/src/composition](backend/src/composition) : composition des dépendances et instanciation des services
- [backend/src/repositories](backend/src/repositories) : implémentations des repositories
- [backend/src/mocks](backend/src/mocks) : données mock utilisées actuellement
- [backend/src/config/AppConfig.ts](backend/src/config/AppConfig.ts) : configuration centralisée via le pattern Singleton

## Configuration avec Singleton

La configuration de l’application est centralisée dans [backend/src/config/AppConfig.ts](backend/src/config/AppConfig.ts).

Le singleton permet de :

- stocker la configuration globale de l’application
- centraliser le port et le mode d’exécution
- éviter plusieurs instances de configuration concurrentes

## Patterns de conception utilisés

Le projet utilise actuellement 4 patterns principaux :

1. Singleton
   - [backend/src/config/AppConfig.ts](backend/src/config/AppConfig.ts)
   - Une seule instance de configuration est utilisée dans toute l’application.

2. Factory
   - [backend/src/services/recommendation/factory/RecommendationFactory.ts](backend/src/services/recommendation/factory/RecommendationFactory.ts)
   - La factory crée le service de recommandation adapté au type demandé : movie, anime ou series.

3. Strategy
   - [backend/src/services/recommendation/filter](backend/src/services/recommendation/filter)
   - [backend/src/services/recommendation/scoring](backend/src/services/recommendation/scoring)
   - [backend/src/services/recommendation/sorting](backend/src/services/recommendation/sorting)
   - Les algorithmes de filtrage, de scoring et de tri sont encapsulés dans des stratégies interchangeables.

4. Decorator
   - [backend/src/services/recommendation/decorator/LoggingScoringDecorator.ts](backend/src/services/recommendation/decorator/LoggingScoringDecorator.ts)
   - Le décorateur ajoute un comportement supplémentaire au scoring sans modifier la logique de base.

## Données mock

Le projet utilise actuellement des repositories mock pour fournir des données en mémoire.

Les mocks sont disponibles dans :

- [backend/src/mocks/Movies.ts](backend/src/mocks/Movies.ts)
- [backend/src/mocks/Series.ts](backend/src/mocks/Series.ts)
- [backend/src/mocks/Anime.ts](backend/src/mocks/Anime.ts)

Les repositories mock correspondants sont dans :

- [backend/src/repositories/movie/MovieMockRepository.ts](backend/src/repositories/movie/MovieMockRepository.ts)
- [backend/src/repositories/series/SeriesMockRepository.ts](backend/src/repositories/series/SeriesMockRepository.ts)
- [backend/src/repositories/anime/AnimeMockRepository.ts](backend/src/repositories/anime/AnimeMockRepository.ts)

## Démarrage du projet

### Backend

Depuis la racine du projet :

```bash
cd backend
npm install
npm run mock
```

Le serveur démarre sur `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Le frontend est disponible sur `http://localhost:5173`.

## API backend

Base URL : `http://localhost:3000`

### Endpoints CRUD

- `GET /movies` : lister les films
- `GET /movies/:id` : récupérer un film
- `POST /movies` : créer un film
- `PUT /movies/:id` : modifier un film
- `DELETE /movies/:id` : supprimer un film

- `GET /anime` : lister les anime
- `GET /anime/:id` : récupérer un anime
- `POST /anime` : créer un anime
- `PUT /anime/:id` : modifier un anime
- `DELETE /anime/:id` : supprimer un anime

- `GET /series` : lister les séries
- `GET /series/:id` : récupérer une série
- `POST /series` : créer une série
- `PUT /series/:id` : modifier une série
- `DELETE /series/:id` : supprimer une série

### Endpoints de recherche

Route : [backend/src/routes/RecommendationRoutes.ts](backend/src/routes/RecommendationRoutes.ts)

- `GET /recommendations/:type/search`

Exemple :

```bash
curl "http://localhost:3000/recommendations/movie/search?genre=Action&rating=4&releaseYear=2020&sort=rating"
```

Paramètres possibles :

- `genre`
- `rating`
- `releaseYear`
- `sort` : `rating`, `releaseYear` ou `score`

### Endpoints de recommandation

- `POST /recommendations/:type/score`

Exemple de body :

```json
{
  "favorites": [
    { "genre": "Action", "rating": 8 },
    { "genre": "Sci-Fi", "rating": 7 }
  ],
  "filters": {
    "genre": "Action",
    "releaseYear": 2020
  }
}
```

Les types supportés sont : `movie`, `anime` et `series`.

## Documentation Swagger

La documentation Swagger est disponible à :

```text
http://localhost:3000/docs
```

## Tests

Les tests backend peuvent être lancés avec :

```bash
cd backend
npm test
```
