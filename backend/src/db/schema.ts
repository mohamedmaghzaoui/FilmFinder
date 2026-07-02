import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const movies = sqliteTable('movies', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  title: text('title').notNull(),

  genre: text('genre').notNull(),

  duration: integer('duration').notNull(),

  rating: real('rating').notNull(),

  releaseYear: integer('release_year').notNull(),

  description: text('description').notNull(),
});

export const series = sqliteTable('series', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  title: text('title').notNull(),
  genre: text('genre').notNull(),

  seasons: integer('seasons').notNull(),
  episodes: integer('episodes').notNull(),

  rating: real('rating').notNull(),
  releaseYear: integer('release_year').notNull(),

  description: text('description').notNull(),
});

export const anime = sqliteTable('anime', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  title: text('title').notNull(),
  genre: text('genre').notNull(),

  episodes: integer('episodes').notNull(),

  rating: real('rating').notNull(),
  releaseYear: integer('release_year').notNull(),

  status: text('status').notNull(), // "ongoing" | "finished"

  description: text('description').notNull(),
});
