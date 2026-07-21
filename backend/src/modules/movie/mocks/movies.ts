import { Movie } from '../types/Movies';

export const moviesMock: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    genre: 'Sci-Fi',
    duration: 148,
    rating: 8.8,
    releaseYear: 2010,
    description: 'A thief who steals secrets through dreams.',

    actionIntensity: 85,
    storyDepth: 9.8,
    visualQuality: 4.8,
    emotionLevel: 72,
    suspenseLevel: 9.9,
  },

  {
    id: 2,
    title: 'Interstellar',
    genre: 'Sci-Fi',
    duration: 169,
    rating: 8.6,
    releaseYear: 2014,
    description: 'Explorers travel through a wormhole.',

    actionIntensity: 45,
    storyDepth: 10,
    visualQuality: 5,
    emotionLevel: 98,
    suspenseLevel: 8,
  },

  {
    id: 3,
    title: 'The Dark Knight',
    genre: 'Action',
    duration: 152,
    rating: 9,
    releaseYear: 2008,
    description: 'Batman faces the Joker.',

    actionIntensity: 98,
    storyDepth: 8.9,
    visualQuality: 4.8,
    emotionLevel: 74,
    suspenseLevel: 10,
  },

  {
    id: 4,
    title: 'Titanic',
    genre: 'Romance',
    duration: 195,
    rating: 7.9,
    releaseYear: 1997,
    description: 'Love aboard the Titanic.',

    actionIntensity: 15,
    storyDepth: 8.5,
    visualQuality: 4.4,
    emotionLevel: 100,
    suspenseLevel: 6,
  },

  {
    id: 5,
    title: 'Avatar',
    genre: 'Fantasy',
    duration: 162,
    rating: 7.8,
    releaseYear: 2009,
    description: 'A marine discovers Pandora.',

    actionIntensity: 82,
    storyDepth: 7.5,
    visualQuality: 5,
    emotionLevel: 78,
    suspenseLevel: 6.8,
  },
];
