export interface Anime {
  id: number;
  title: string;
  genre: string;
  episodes: number;
  rating: number;
  releaseYear: number;
  status: 'ongoing' | 'finished';
  description: string;
}
