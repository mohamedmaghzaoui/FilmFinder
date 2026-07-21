import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { anime } from '../db/schema';

export type Anime = InferSelectModel<typeof anime>;

export type AnimeRequest = InferInsertModel<typeof anime>;

export type AnimeUpdateRequest = Partial<AnimeRequest>;
