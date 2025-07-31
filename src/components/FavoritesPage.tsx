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
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
        setLoading(false);
      }
    };

    if (storedIds.length > 0) {
      fetchFavoriteMovies();
    } else {
      setLoading(false);
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
    <div style={{ 
      padding: '2rem 1rem',
      minHeight: '100vh',
      background: '#000000',
      position: 'relative'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        padding: '1rem',
        border: '2px solid #ff0000',
        background: 'rgba(255, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          color: '#ff0000', 
          marginBottom: '0.5rem',
          fontSize: '1.8rem',
          textShadow: '0 0 10px #ff0000',
          fontFamily: 'Comic Sans MS, cursive',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          🔥 YOUR STASH 🔥
        </h2>
        <div style={{
          color: '#ffff00',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          fontFamily: 'Courier New, monospace'
        }}>
          💀 KEEP THIS LIST SECRET 💀
        </div>
      </div>

      {loading ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
          gap: '1rem'
        }}>
          <div style={{
            color: '#00ff00',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            fontFamily: 'Courier New, monospace'
          }}>
            LOADING YOUR SECRET COLLECTION...
          </div>
          <div style={{
            width: '200px',
            height: '10px',
            background: '#000000',
            border: '2px solid #00ff00',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #00ff00, #00ffff)',
              animation: 'loading 2s ease-in-out infinite',
              width: '50%'
            }}></div>
          </div>
        </div>
      ) : (
        <>
          {favorites.length > 0 ? (
            <div className="movie-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              padding: '1rem 0'
            }}>
              {favorites.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onFavoriteToggle={toggleFavorite}
                  isFavorited={true}
                />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              border: '2px solid #666666',
              background: 'rgba(102, 102, 102, 0.1)',
              color: '#666666'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                💀
              </div>
              <h3 style={{
                color: '#666666',
                fontFamily: 'Courier New, monospace',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                YOUR STASH IS EMPTY
              </h3>
              <p style={{
                color: '#888888',
                fontSize: '0.9rem',
                marginTop: '1rem'
              }}>
                Go back and add some movies to your secret collection!
              </p>
            </div>
          )}
        </>
      )}

      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#ff0000',
        color: '#ffffff',
        padding: '5px 10px',
        fontSize: '10px',
        fontWeight: 'bold',
        border: '1px solid #ffffff',
        animation: 'blink 2s infinite'
      }}>
        🚨 CLEAR HISTORY 🚨
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default FavoritesPage;