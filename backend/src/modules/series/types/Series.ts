import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { series } from '../../../db/schema';

export type Series = InferSelectModel<typeof series>;

export type SeriesRequest = InferInsertModel<typeof series>;

export type SeriesUpdateRequest = Partial<Series>;
