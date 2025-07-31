import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  [key: string]: any;
}

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedIds: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    const fetchFavoriteMovies = async () => {
      try {
        const responses = await Promise.all(
          storedIds.map(id =>
            fetch(`http://localhost:8080/api/movies/${id}`).then(res => res.json())
          )
        );
        setFavorites(responses);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    if (storedIds.length > 0) {
      fetchFavoriteMovies();
    }
  }, []);

  const toggleFavorite = (id: number) => {
    let updatedIds = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (updatedIds.includes(id)) {
      updatedIds = updatedIds.filter((favId: number) => favId !== id);
    } else {
      updatedIds.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(updatedIds));
    setFavorites(prev => prev.filter(movie => updatedIds.includes(movie.id)));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#70cfff', marginBottom: '1.5rem' }}>My Favorite Movies</h2>
      <div className="movie-grid">
        {favorites.length > 0 ? (
          favorites.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteToggle={toggleFavorite}
              isFavorited={true}
            />
          ))
        ) : (
          <p style={{ color: '#ccc' }}>No favorites saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
