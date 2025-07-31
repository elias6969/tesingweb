import { useEffect, useState } from 'react';
import './MovieCard.css';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    overview: string;
    posterPath: string;
  };
  onFavoriteToggle?: (id: number) => void;
  isFavorited?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('modal-open', showModal);
    return () => document.body.classList.remove('modal-open');
  }, [showModal]);

  return (
    <>
      <div className="movie-card" onClick={() => setShowModal(true)}>
        <img src={movie.posterPath} alt={movie.title} className="movie-poster" />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
        </div>
      </div>

      {showModal && (
        <div className="movie-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="movie-modal" onClick={e => e.stopPropagation()}>
            <img src={movie.posterPath} alt={movie.title} className="movie-modal-poster" />
            <div className="movie-modal-content">
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <button className="close-button" onClick={() => setShowModal(false)}>✕</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
