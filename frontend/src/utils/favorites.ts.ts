function createFavoriteStorage(key: string) {
  return {
    getIds(): number[] {
      const data = localStorage.getItem(key);

      return data ? JSON.parse(data) : [];
    },

    add(id: number) {
      const ids = this.getIds();

      if (!ids.includes(id)) {
        ids.push(id);
      }

      localStorage.setItem(key, JSON.stringify(ids));
    },

    remove(id: number) {
      const ids = this.getIds().filter((itemId) => itemId !== id);

      localStorage.setItem(key, JSON.stringify(ids));
    },

    isFavorite(id: number) {
      return this.getIds().includes(id);
    },
  };
}
export const movieFavoriteStorage = createFavoriteStorage('favoriteMovies');

export const seriesFavoriteStorage = createFavoriteStorage('favoriteSeries');

export const animeFavoriteStorage = createFavoriteStorage('favoriteAnime');
