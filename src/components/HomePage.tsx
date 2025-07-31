import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useTheme } from "./ThemeContext";
import "./HomePage.css";

const HomePage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [visitorCount] = useState(() => Math.floor(Math.random() * 50000) + 10000);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("http://localhost:8080/api/tmdb/clean-fetch")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);

        const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(stored);
      })
      .catch((err) => {
        console.error("Failed to fetch movies:", err);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (id: number) => {
    let updated = [...favorites];
    if (favorites.includes(id)) {
      updated = updated.filter((favId) => favId !== id);
    } else {
      updated.push(id);
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const getThemeMessages = () => {
    switch (theme) {
      case 'futuristic':
        return [
          "🤖 NEURAL NETWORK ACTIVE 🤖",
          "⚡ QUANTUM STREAMING ENABLED ⚡",
          "🔮 FUTURE TECH PROTOCOLS 🔮",
          "🛸 ALIEN CONTENT DETECTED 🛸",
          "💫 CYBERNETIC ENHANCEMENT 💫"
        ];
      case 'creepy':
        return [
          "👻 SPIRITS IN THE MACHINE 👻",
          "🩸 BLOOD ON THE SERVERS 🩸",
          "💀 DEATH AWAITS DOWNLOADERS 💀",
          "🕷️ CRAWLING WITH MALWARE 🕷️",
          "🔪 SLASHER FILMS INSIDE 🔪"
        ];
      case 'neon':
        return [
          "🌃 NEON NIGHTS STREAMING 🌃",
          "💎 PREMIUM SYNTHWAVE CONTENT 💎",
          "🎵 RETRO FUTURE VIBES 🎵",
          "🚗 MIDNIGHT DRIVE MOVIES 🚗",
          "✨ ELECTRIC DREAMS ACTIVE ✨"
        ];
      case 'matrix':
        return [
          "💊 TAKE THE RED PILL 💊",
          "🔢 DIGITAL RAIN FALLING 🔢",
          "👁️ THE MATRIX HAS YOU 👁️",
          "🕳️ RABBIT HOLE DETECTED 🕳️",
          "⚡ REALITY IS AN ILLUSION ⚡"
        ];
      default:
        return [
          "🚨 FBI WANTS TO KNOW YOUR LOCATION 🚨",
          "⚠️ Your ISP has been notified ⚠️",
          "🎬 FRESH RIPS DAILY 🎬",
          "💀 DOWNLOAD AT YOUR OWN RISK 💀",
          "🔥 QUALITY NOT GUARANTEED 🔥",
          "👁️ SOMEONE IS WATCHING 👁️"
        ];
    }
  };

  const [currentMessage, setCurrentMessage] = useState(getThemeMessages()[0]);

  useEffect(() => {
    const messages = getThemeMessages();
    const interval = setInterval(() => {
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [theme]);

  const getThemeTitle = () => {
    switch (theme) {
      case 'futuristic': return '🤖 CYBERFLEX NEO ARCHIVE 🤖';
      case 'creepy': return '👻 HORROR VAULT UNDERGROUND 👻';
      case 'neon': return '🌃 NEON STREAM NETWORK 🌃';
      case 'matrix': return '💊 DIGITAL CINEMA MATRIX 💊';
      default: return '🕊️ PIGEON FLIX UNDERGROUND 🕊️';
    }
  };

  return (
    <div className="homepage">
      <div className="warning-banner">
        <div className="scrolling-text">
          {currentMessage} • VISITOR #{visitorCount.toLocaleString()} • LAST RAID: 3 DAYS AGO • 
        </div>
      </div>
      
      <div className="header-section">
        <h1 className="glitch" data-text={getThemeTitle()}>
          {getThemeTitle()}
        </h1>
        <div className="subtitle">
          <span className="blink">●</span> TOTALLY LEGAL MOVIE ARCHIVE <span className="blink">●</span>
        </div>
        <div className="stats-bar">
          <span>ONLINE: {Math.floor(Math.random() * 500) + 100}</span>
          <span>SEEDS: {Math.floor(Math.random() * 1000) + 500}</span>
          <span>RATIO: {(Math.random() * 2 + 0.5).toFixed(2)}</span>
        </div>
      </div>

      <div className="content-wrapper">
        {loading ? (
          <div className="loading-screen">
            <div className="loading-text">
              <span>LOADING FORBIDDEN CONTENT</span>
              <div className="loading-dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="disclaimer">
              <marquee behavior="scroll" direction="left" scrollamount="3">
                ⚠️ DISCLAIMER: We are not responsible for any legal consequences ⚠️ 
                Use VPN ⚠️ Clear your browser history ⚠️ Don't tell anyone about this site ⚠️
              </marquee>
            </div>
            
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={{
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    posterPath: `https://image.tmdb.org/t/p/w200${movie.posterPath}`,
                  }}
                  onFavoriteToggle={toggleFavorite}
                  isFavorited={favorites.includes(movie.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;