import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { movies } from '../db/schema';

export type Movie = InferSelectModel<typeof movies>;
export type MovieRequest = InferInsertModel<typeof movies>;
export type MovieUpdateRequest = Partial<MovieRequest>;
