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

  const fakeDownloadLinks = [
    { name: 'TORRENT', quality: '720p', size: '1.2GB' },
    { name: 'DIRECT', quality: '1080p', size: '2.8GB' },
    { name: 'STREAM', quality: '480p', size: 'N/A' },
    { name: 'MEGA', quality: '4K', size: '8.5GB' }
  ];

  const handleDownloadClick = (linkName: string) => {
    const warnings = [
      '🚨 VIRUS DETECTED! Just kidding... or am I? 🚨',
      '⚠️ Your mom called, she knows what you\'re doing ⚠️',
      '🔒 FBI VAN OUTSIDE YOUR HOUSE 🔒',
      '💀 RIP YOUR HARD DRIVE 💀',
      '🎭 FAKE LINK DETECTED 🎭'
    ];
    alert(warnings[Math.floor(Math.random() * warnings.length)]);
  };

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
              
              <div className="download-section">
                <h3>🏴‍☠️ DOWNLOAD LINKS 🏴‍☠️</h3>
                <div className="download-links">
                  {fakeDownloadLinks.map((link, index) => (
                    <button
                      key={index}
                      className="download-link"
                      onClick={() => handleDownloadClick(link.name)}
                    >
                      {link.name} [{link.quality}] - {link.size}
                    </button>
                  ))}
                </div>
                <p style={{ 
                  fontSize: '0.7rem', 
                  color: '#ff0000', 
                  marginTop: '1rem',
                  textAlign: 'center'
                }}>
                  ⚠️ CLICK AT YOUR OWN RISK ⚠️ WE ARE NOT RESPONSIBLE FOR ANYTHING ⚠️
                </p>
              </div>
              
              <button className="close-button" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;