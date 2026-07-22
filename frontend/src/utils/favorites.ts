const KEY = 'favoriteMovies';

export const favoriteStorage = {
  getIds(): number[] {
    const data = localStorage.getItem(KEY);

    return data ? JSON.parse(data) : [];
  },

  add(id: number) {
    const ids = this.getIds();

    if (!ids.includes(id)) {
      ids.push(id);
    }

    localStorage.setItem(KEY, JSON.stringify(ids));
  },

  remove(id: number) {
    const ids = this.getIds().filter((movieId) => movieId !== id);

    localStorage.setItem(KEY, JSON.stringify(ids));
  },

  isFavorite(id: number) {
    return this.getIds().includes(id);
  },
};
