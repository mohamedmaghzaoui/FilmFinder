import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const movies = sqliteTable('movies', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  title: text('title').notNull(),

  genre: text('genre').notNull(),

  duration: integer('duration').notNull(),

  rating: real('rating').notNull(),

  releaseYear: integer('release_year').notNull(),

  description: text('description').notNull(),

  // Recommendation features
  actionIntensity: real('action_intensity').notNull(),

  storyDepth: real('story_depth').notNull(),

  visualQuality: real('visual_quality').notNull(),

  emotionLevel: real('emotion_level').notNull(),

  suspenseLevel: real('suspense_level').notNull(),
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

  // Recommendation features
  characterDevelopment: real('character_development').notNull(),

  storyComplexity: real('story_complexity').notNull(),

  episodeAddiction: real('episode_addiction').notNull(),

  dramaLevel: real('drama_level').notNull(),

  humorLevel: real('humor_level').notNull(),
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

  // Recommendation features 0-1
  fightIntensity: real('fight_intensity').notNull(),

  worldBuilding: real('world_building').notNull(),

  animationQuality: real('animation_quality').notNull(),

  emotionLevel: real('emotion_level').notNull(),

  fantasyLevel: real('fantasy_level').notNull(),
});
