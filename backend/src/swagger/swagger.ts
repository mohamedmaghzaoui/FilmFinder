import swaggerJsdoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FilmFinder API',
      version: '1.0.0',
      description: 'API Movies / Anime / Series',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Movie: {
          type: 'object',
          required: [
            'title',
            'genre',
            'duration',
            'rating',
            'releaseYear',
            'description',
          ],
          properties: {
            id: { type: 'string', example: '1' },
            title: { type: 'string', example: 'Interstellar' },
            genre: { type: 'string', example: 'Sci-Fi' },
            duration: { type: 'integer', example: 169 },
            rating: { type: 'number', example: 8.9 },
            releaseYear: { type: 'integer', example: 2014 },
            description: {
              type: 'string',
              example: 'Space mission to save humanity',
            },
          },
          example: {
            id: '1',
            title: 'Interstellar',
            genre: 'Sci-Fi',
            duration: 169,
            rating: 8.9,
            releaseYear: 2014,
            description: 'Space mission to save humanity',
          },
        },

        Anime: {
          type: 'object',
          required: [
            'title',
            'genre',
            'episodes',
            'rating',
            'releaseYear',
            'status',
            'description',
          ],
          properties: {
            id: { type: 'string', example: '1' },
            title: { type: 'string', example: 'Attack on Titan' },
            genre: { type: 'string', example: 'Action' },
            episodes: { type: 'integer', example: 25 },
            rating: { type: 'number', example: 9.1 },
            releaseYear: { type: 'integer', example: 2013 },
            status: {
              type: 'string',
              enum: ['ongoing', 'finished'],
              example: 'finished',
            },
            description: {
              type: 'string',
              example: 'Humans fight giant Titans',
            },
          },
          example: {
            id: '1',
            title: 'Attack on Titan',
            genre: 'Action',
            episodes: 25,
            rating: 9.1,
            releaseYear: 2013,
            status: 'finished',
            description: 'Humans fight giant Titans',
          },
        },

        Series: {
          type: 'object',
          required: [
            'title',
            'genre',
            'seasons',
            'episodes',
            'rating',
            'releaseYear',
            'description',
          ],
          properties: {
            id: { type: 'string', example: '1' },
            title: { type: 'string', example: 'Breaking Bad' },
            genre: { type: 'string', example: 'Drama' },
            seasons: { type: 'integer', example: 5 },
            episodes: { type: 'integer', example: 62 },
            rating: { type: 'number', example: 9.5 },
            releaseYear: { type: 'integer', example: 2008 },
            description: {
              type: 'string',
              example: 'Teacher becomes drug producer',
            },
          },
          example: {
            id: '1',
            title: 'Breaking Bad',
            genre: 'Drama',
            seasons: 5,
            episodes: 62,
            rating: 9.5,
            releaseYear: 2008,
            description: 'Teacher becomes drug producer',
          },
        },

        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Error message' },
          },
        },
      },
    },
  },
  apis: ['./src/modules/**/*.ts'],
});

export default swaggerSpec;
