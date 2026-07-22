export type RecommendationType = 'movie' | 'anime' | 'series';
export interface RecommendationFilters {
  genre?: string;
  rating?: number;
  releaseYear?: number;
}

export interface RecommendationItem {
  title?: string;
  genre?: string;
  rating?: number;
  releaseYear?: number;
  score?: number;
  [key: string]: string | number | undefined;
}

export interface RecommendationRepository<T> {
  findAll(): Promise<T[]>;
}
